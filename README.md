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

## Topluluk

* Telegram: <https://t.me/producthuntturkey>
* Mail listesi: <https://producthuntturkey.substack.com/>

## Sen de katkıda bulun

Öneri, düzeltme ya da eksik bir kaynak için [issue açabilir](https://github.com/ProductHuntTurkey/producthuntturkey/issues) veya pull request gönderebilirsin.

## Katkıda bulunanlar

* [Abdullah ŞAHİN](https://github.com/mrabdullahsahin)
* [Ubeyd GENCER](https://github.com/ubeydgencer)
