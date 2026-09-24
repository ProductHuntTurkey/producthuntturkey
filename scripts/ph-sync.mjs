#!/usr/bin/env node
// Product Hunt ile veriyi, sınırlara takılmadan günceller.
//
//   node scripts/ph-sync.mjs links                 Lansman bağlantılarını kontrol eder.
//   node scripts/ph-sync.mjs candidates [--days 7]  PH API'sinden aday lansmanları toplar (PH_TOKEN gerekir).
//
// Kurallar:
// - İstekler sırayla atılır; paralel istek yok.
// - Sayfa bağlantıları arasında en az LINK_DELAY_MS beklenir, son STALE_DAYS içinde
//   kontrol edilen bağlantı yeniden istenmez.
// - 429 gelirse Retry-After (yoksa üstel bekleme) kadar beklenir; üst üste
//   MAX_429 kez gelirse çalışma durur, kalan iş sonraki çalışmaya bırakılır.
// - API'de X-Rate-Limit-Remaining, RESERVE altına düşerse X-Rate-Limit-Reset kadar beklenir.
// - Tamamlanan günler kaydedilir; yarıda kalan tarama kaldığı yerden sürer.
// - Adaylar yalnızca keşif sinyalidir; siteye doğrudan eklenmez.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LAUNCHES = join(ROOT, 'src/data/launches.json');
const COMPANIES = join(ROOT, 'src/data/companies.json');
const LINK_STATUS = join(ROOT, 'data/ph-link-status.json');
const SYNC_STATE = join(ROOT, 'data/ph-sync-state.json');
const CANDIDATES = join(ROOT, 'data/adaylar.json');

const USER_AGENT = 'ProductHuntTurkeyBot/1.0 (+https://github.com/ProductHuntTurkey/producthuntturkey)';
const LINK_DELAY_MS = 5_000;
const STALE_DAYS = 30;
const MAX_429 = 3;
const MAX_LINKS_PER_RUN = Number(process.env.MAX_LINKS_PER_RUN ?? 60);
const API_URL = 'https://api.producthunt.com/v2/api/graphql';
const API_RESERVE = 500;
const PAGE_SIZE = 20;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const today = () => new Date().toISOString().slice(0, 10);
const log = (...a) => console.log(...a);

async function readJson(path, fallback) {
  try {
    return JSON.parse(await readFile(path, 'utf8'));
  } catch (e) {
    if (e.code === 'ENOENT') return fallback;
    throw e;
  }
}

async function writeJson(path, data) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, JSON.stringify(data, null, 2) + '\n');
}

function retryAfterMs(res, attempt) {
  const header = Number(res.headers.get('retry-after'));
  return Number.isFinite(header) && header > 0 ? header * 1000 : 60_000 * 2 ** attempt;
}

// ---------------------------------------------------------------- links

async function checkLinks() {
  const launches = await readJson(LAUNCHES, []);
  const status = await readJson(LINK_STATUS, {});
  const staleBefore = Date.now() - STALE_DAYS * 86_400_000;

  // Durum adrese göre tutulur: aynı sayfayı paylaşan lansmanlar için tek istek atılır.
  const urls = [...new Set(launches.map((l) => l.phUrl).filter(Boolean))];
  const fresh = (u) => status[u] && status[u].status === 200 && Date.parse(status[u].checkedAt) > staleBefore;
  const due = urls.filter((u) => !fresh(u));
  const batch = due.slice(0, MAX_LINKS_PER_RUN);
  log(`${urls.length} adres, ${due.length} kontrol bekliyor, bu çalışmada ${batch.length}.`);

  let consecutive429 = 0;
  let stopped = false;
  for (const [i, url] of batch.entries()) {
    if (i > 0) await sleep(LINK_DELAY_MS);
    let res;
    for (let attempt = 0; ; attempt++) {
      res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': USER_AGENT } });
      await res.body?.cancel();
      if (res.status !== 429) break;
      consecutive429++;
      if (consecutive429 >= MAX_429) break;
      const wait = retryAfterMs(res, attempt);
      log(`  429 — ${Math.round(wait / 1000)} sn bekleniyor`);
      await sleep(wait);
    }
    if (res.status === 429) {
      log(`Üst üste ${MAX_429} kez 429 alındı; kalan ${batch.length - i} bağlantı sonraki çalışmaya bırakıldı.`);
      stopped = true;
      break;
    }
    consecutive429 = 0;
    status[url] = { status: res.status, finalUrl: res.url, checkedAt: new Date().toISOString() };
    log(`  ${res.status}  ${url}`);
  }

  await writeJson(LINK_STATUS, status);
  const broken = launches.filter((l) => l.phUrl && status[l.phUrl] && status[l.phUrl].status !== 200);
  if (broken.length) {
    log(`\nSorunlu bağlantılar (${broken.length}):`);
    for (const l of broken) log(`  ${status[l.phUrl].status}  ${l.name}  ${l.phUrl}`);
  } else {
    log('\nSorunlu bağlantı yok.');
  }
  if (stopped) log('Sınır nedeniyle yarıda kaldı; kalanlar sonraki çalışmada kontrol edilecek.');
}

// ---------------------------------------------------------------- candidates

const POSTS_QUERY = `
query Posts($after: String, $postedAfter: DateTime!, $postedBefore: DateTime!, $first: Int!) {
  posts(first: $first, after: $after, postedAfter: $postedAfter, postedBefore: $postedBefore, order: NEWEST) {
    pageInfo { hasNextPage endCursor }
    nodes {
      id name tagline slug url website featuredAt createdAt
      productLinks { type url }
      makers { name username headline twitterUsername }
    }
  }
}`;

async function graphql(token, variables) {
  for (let attempt = 0; attempt < MAX_429; attempt++) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
        accept: 'application/json',
        'user-agent': USER_AGENT,
      },
      body: JSON.stringify({ query: POSTS_QUERY, variables }),
    });
    if (res.status === 429) {
      const wait = Number(res.headers.get('x-rate-limit-reset')) * 1000 || retryAfterMs(res, attempt);
      log(`  API 429 — ${Math.round(wait / 1000)} sn bekleniyor`);
      await sleep(wait);
      continue;
    }
    if (!res.ok) throw new Error(`PH API ${res.status}: ${await res.text()}`);
    const remaining = Number(res.headers.get('x-rate-limit-remaining'));
    const reset = Number(res.headers.get('x-rate-limit-reset'));
    const body = await res.json();
    if (body.errors) throw new Error(`PH API: ${JSON.stringify(body.errors)}`);
    if (Number.isFinite(remaining) && remaining < API_RESERVE && Number.isFinite(reset)) {
      log(`  Kota ${remaining}; ${reset} sn sıfırlanma bekleniyor`);
      await sleep((reset + 5) * 1000);
    }
    return body.data;
  }
  throw new Error('PH API üst üste 429 döndü; tarama durduruldu.');
}

// Keşif sinyalleri. Hiçbiri tek başına Türkiye bağlantısı kanıtı değildir (bkz. /yontem/).
const TURKEY_TEXT = /(?<!\p{L})(?:t[uü]rkiye|turkey|t[uü]rk|turkish|[iİ]stanbul|ankara|[iİ]zmir)(?!\p{L})/iu;

// API adreslere utm parametreleri ekler; karşılaştırma ve kayıt için temizlenir.
function cleanUrl(url) {
  if (!url) return null;
  const u = new URL(url);
  u.search = '';
  u.hash = '';
  return u.toString().replace(/\/$/, '');
}

// `website` bir PH yönlendirmesidir (producthunt.com/r/...); gerçek alan adları productLinks'te olabilir.
function productHosts(post) {
  return (post.productLinks ?? [])
    .map((l) => {
      try {
        return new URL(l.url).hostname.replace(/^www\./, '');
      } catch {
        return null;
      }
    })
    .filter((h) => h && !h.endsWith('producthunt.com'));
}

function signals(post, knownDomains) {
  const found = [];
  for (const host of productHosts(post)) {
    if (host.endsWith('.tr')) found.push(`.tr alan adı (${host})`);
    if (knownDomains.has(host)) found.push(`kayıtlı şirket alan adı (${host})`);
  }
  for (const m of post.makers ?? []) {
    if (m.headline && TURKEY_TEXT.test(m.headline)) found.push(`maker açıklaması: ${m.name} — “${m.headline}”`);
  }
  if (TURKEY_TEXT.test(post.tagline)) found.push(`tagline: “${post.tagline}”`);
  return found;
}

function argValue(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
}

async function collectCandidates() {
  const token = process.env.PH_TOKEN;
  if (!token) {
    log('PH_TOKEN tanımlı değil; aday taraması atlandı. Bkz. README “Product Hunt senkronizasyonu”.');
    return;
  }
  const days = Number(argValue('days', 7));
  const state = await readJson(SYNC_STATE, { completedDays: [] });
  const candidates = (await readJson(CANDIDATES, [])).map((c) => ({ ...c, phUrl: cleanUrl(c.phUrl), website: cleanUrl(c.website) }));
  const launches = await readJson(LAUNCHES, []);
  const companies = await readJson(COMPANIES, []);
  const knownUrls = new Set(launches.map((l) => l.phUrl));
  const seen = new Set(candidates.map((c) => c.phPostId));
  const knownDomains = new Set(
    companies.flatMap((c) => (c.website ? [new URL(c.website).hostname.replace(/^www\./, '')] : [])),
  );

  // Bugün hâlâ sürdüğü için dün ve öncesi taranır.
  const end = new Date(`${today()}T00:00:00Z`);
  for (let d = days; d >= 1; d--) {
    const from = new Date(end.getTime() - d * 86_400_000);
    const day = from.toISOString().slice(0, 10);
    if (state.completedDays.includes(day)) continue;
    const to = new Date(from.getTime() + 86_400_000);

    let after = null;
    let pages = 0;
    let added = 0;
    do {
      const data = await graphql(token, {
        after,
        first: PAGE_SIZE,
        postedAfter: from.toISOString(),
        postedBefore: to.toISOString(),
      });
      pages++;
      for (const post of data.posts.nodes) {
        const phUrl = cleanUrl(post.url);
        if (seen.has(post.id) || knownUrls.has(phUrl)) continue;
        const found = signals(post, knownDomains);
        if (!found.length) continue;
        seen.add(post.id);
        added++;
        candidates.push({
          phPostId: post.id,
          name: post.name,
          tagline: post.tagline,
          phUrl,
          website: cleanUrl(post.website),
          productHosts: productHosts(post),
          launchDate: (post.featuredAt ?? post.createdAt).slice(0, 10),
          makers: (post.makers ?? []).map((m) => ({ name: m.name, username: m.username })),
          signals: found,
          foundAt: today(),
          review: 'bekliyor',
        });
      }
      after = data.posts.pageInfo.hasNextPage ? data.posts.pageInfo.endCursor : null;
    } while (after);

    state.completedDays.push(day);
    state.completedDays.sort();
    await writeJson(SYNC_STATE, state);
    await writeJson(CANDIDATES, candidates);
    log(`${day}: ${pages} sayfa, ${added} yeni aday`);
  }
  log(`Toplam aday: ${candidates.length} (${candidates.filter((c) => c.review === 'bekliyor').length} inceleme bekliyor)`);
}

// ---------------------------------------------------------------- main

const cmd = process.argv[2];
if (cmd === 'links') await checkLinks();
else if (cmd === 'candidates') await collectCandidates();
else {
  console.error('Kullanım: node scripts/ph-sync.mjs <links|candidates> [--days N]');
  process.exitCode = 1;
}
