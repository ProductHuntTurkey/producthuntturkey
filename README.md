![Product Hunt Turkey](readme.jpg)

[![Netlify Status](https://api.netlify.com/api/v1/badges/2db1759d-ec93-4184-955d-3ef02eac00b9/deploy-status)](https://app.netlify.com/sites/producthuntturkey/deploys)

[Product Hunt Turkey](https://producthuntturkey.netlify.app/), Product Hunt’ta lansman yapan Türkiye bağlantılı girişimleri, bu bağlantının kaynaklarıyla birlikte listeleyen açık kaynaklı bir topluluk projesidir.

## Kullanılan teknolojiler

* [Astro](https://astro.build/) — statik site, içerik koleksiyonları
* JSON veri dosyaları + Zod şeması

## Kurulum

Node.js 22.12 veya üstü gerekir (`.nvmrc`).

	git clone https://github.com/ProductHuntTurkey/producthuntturkey.git
	cd producthuntturkey
	npm install
	npm run dev

Diğer komutlar: `npm run build` (çıktı `dist/`), `npm run preview`, `npm run check` (tip ve şema kontrolü).

## Veri

Bütün içerik iki dosyada:

* `src/data/companies.json` — Türkiye bağlantısı kaynaklarla gösterilmiş şirketler. Bağlantı dört ayrı alanda tutulur (`turkishFounder`, `turkeyHeadquartered`, `turkeyOperations`, `makerTurkeyLink`); bilinmeyen değer `null`’dır, asla `false` değildir. Her şirketin en az bir kaynağı (`evidence`) vardır.
* `src/data/launches.json` — Product Hunt lansmanları. `company` alanı boşsa kayıt “Arşiv — doğrulanmadı” olarak gösterilir. Kesin gün bilinmiyorsa `launchDate: null`, `datePrecision: "year"` kullanılır.

Şema `src/content.config.ts` içinde; hatalı bir kayıt derlemeyi durdurur. Hangi bilginin kanıt sayıldığı sitedeki [Yöntem](https://producthuntturkey.netlify.app/yontem/) sayfasında anlatılıyor.

Görseller `public/images/` altında.

## Başvurular

“Girişimini ekle” formu Netlify Forms ile çalışır; başvurular Netlify panelindeki **Forms** bölümüne düşer. Bir başvuru, kaynakları kontrol edilmeden `launches.json`’a eklenmez.

## Product Hunt senkronizasyonu

`scripts/ph-sync.mjs` Product Hunt'ın istek sınırlarına takılmadan çalışacak şekilde yazıldı: istekler sırayla ve aralıklı atılır, 30 gün içinde kontrol edilmiş bağlantılar tekrar istenmez, 429 alınınca beklenir ve üst üste gelirse iş sonraki çalışmaya bırakılır.

	node scripts/ph-sync.mjs links                # PH bağlantılarını kontrol eder → data/ph-link-status.json
	PH_TOKEN=... node scripts/ph-sync.mjs candidates --days 7   # aday lansmanlar → data/adaylar.json

Aday taraması [Product Hunt API v2](https://api.producthunt.com/v2/docs) ile gün gün yapılır. API'nin 15 dakikalık kotası (6250 puan) yanıt başlıklarından izlenir; kota azalınca sıfırlanması beklenir. Tamamlanan günler `data/ph-sync-state.json`'a yazılır, yarıda kalan tarama oradan devam eder.

Adaylar yalnızca keşif sinyaliyle (maker açıklamasında Türkiye/İstanbul, `.tr` alan adı, kayıtlı şirket alan adı) bulunur ve siteye **eklenmez**. Her aday [Yöntem](https://producthuntturkey.netlify.app/yontem/) sayfasındaki kurallara göre kaynaklarıyla doğrulandıktan sonra elle `launches.json`'a taşınır.

`.github/workflows/ph-sync.yml` bunu her pazartesi çalıştırır ve sonucu PR olarak açar. Aday taraması için depo ayarlarında `PH_TOKEN` secret'ı tanımlanmalı (Product Hunt API Dashboard → uygulama oluştur → Developer Token). Ticari kullanım için Product Hunt'ın izni gerekir.

## Topluluk

* Telegram: <https://t.me/producthuntturkey>
* Mail listesi: <https://producthuntturkey.substack.com/>

## Sen de katkıda bulun

Öneri, düzeltme ya da eksik bir kaynak için [issue açabilir](https://github.com/ProductHuntTurkey/producthuntturkey/issues) veya pull request gönderebilirsin.

## Katkıda bulunanlar

* [Abdullah ŞAHİN](https://github.com/mrabdullahsahin)
* [Ubeyd GENCER](https://github.com/ubeydgencer)
