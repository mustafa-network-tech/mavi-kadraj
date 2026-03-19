# Mavi Kadraj — Next.js

WordPress sitesinin Next.js (App Router) karşılığı.

## Çalıştırma

```bash
cd web
npm install
npm run dev
```

Tarayıcı: [http://localhost:3000](http://localhost:3000)

## Yapı

| Yol | Açıklama |
|-----|----------|
| `/` | Ana sayfa |
| `/kadraj-yansimalari` | Kadraj yansımaları galerisi |
| `/hikayedram`, `/tarihkultur`, … | Kategori sayfaları (içerik şablonu) |
| `/yasamdan-yansimalar` | Video sayfası şablonu |

## İçeriği nereden düzenlersiniz?

- **Genel metin, linkler, galeri görselleri:** `src/lib/site.ts`
- **Tasarım renkleri:** `src/app/globals.css`
- **Üst menü:** `src/components/SiteHeader.tsx`
- **Kategori sayfaları:** `src/app/[slug]/page.tsx` (her slug için zengin içerik ekleyebilir veya sayfa başına `page.tsx` açabilirsiniz)

## WordPress’ten içerik taşıma

1. **Metin:** WP admin’den kopyalayıp `site.ts` veya yeni MDX sayfalarına yapıştırın.
2. **Görseller:** `wp-content/uploads` dosyalarını `public/images/` altına koyun; `site.ts` içindeki `image` URL’lerini `/images/...` yapın.
3. **Otomatik:** İsterseniz bir kerelik script ile `yoursite.com/wp-json/wp/v2/pages` API’sinden sayfaları çekip JSON/MDX üretebilirsiniz.

## Yayınlama

[Vercel](https://vercel.com): repo’yu bağlayın, kök dizin olarak `web` seçin.

Domain’i `src/lib/site.ts` içindeki `site.url` ile güncelleyin.
