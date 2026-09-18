# Mavi Kadraj SEO çalışma raporu

Tarih: 18 Eylül 2026. Değişiklikler yalnızca yerelde yapıldı. Commit, push, deploy, Search Console işlemi, veritabanı işlemi ve orijinal fotoğraf değişikliği yapılmadı.

## A) www.mavikadraj.com.tr

### Analiz ve bulunan sorunlar

- Framework: Next.js 16.2.0, React 19.2.4, App Router. Gerçek public içerik sayfaları production build'de SSG ile üretiliyor. Mobil menü, lightbox ve hareketli fotoğraf sahnesi client bileşenleri; bunların varlığı içeriğin tamamının CSR olduğu anlamına gelmiyor. Fotoğraflar ve metinler ilk HTML'de bulunuyor.
- Önceki `metadataBase` non-www domain kullanıyordu. Sayfalarda canonical tanımı yoktu.
- Sitemap ve robots route'ları yoktu. Structured data yoktu.
- Birçok sayfa layout'taki genel Open Graph/Twitter başlığını, açıklamasını ve ana sayfa URL'sini devralıyordu.
- Ana sayfa description'ı çok kısa, birçok koleksiyon description'ı yalnızca kısa bir alt başlıktı.
- Yazılarda koleksiyona ait bilinen fotoğrafların alt metinleri boştu.
- Favicon, icon, apple-icon ve paylaşım görseli mevcut. Manifest bulunmuyor; bu çalışma için yeni manifest gerekmedi.
- Semantic `main`, `header`, `nav`, `section`, `article`, `figure` ve galeri `figcaption` kullanımı mevcut. Doğrulanan 21 sayfanın her birinde bir H1 var. Tasarımı etkileyecek heading değişikliği yapılmadı.
- Bilinmeyen koleksiyon/yazı slug'ları `notFound()` ile ele alınıyor. Yeni redirect eklenmedi.

### Yapılan düzeltmeler

- Production metadata temel adresi `https://www.mavikadraj.com.tr` yapıldı.
- Her public sayfaya kendi canonical, title, description, og:url, og:title, og:description, og:image ve Twitter card bilgisi eklendi. Yazılarda gerçek yayın tarihi ve mevcut OG görseli kullanılıyor.
- Ana sayfa title: **Mavi Kadraj | Doğa, Manzara ve Fotoğraf Hikâyeleri**.
- Framework'ün metadata route yapısıyla `robots.txt` ve `sitemap.xml` oluşturuldu. Public içerik ve gerekli JS/CSS engellenmiyor.
- Sitemap yalnızca 21 gerçek içerik sayfasını içeriyor. Kaldırılmış sayfalar, hata sayfaları, filtreler ve asset route'ları dahil değil. Build tarihi `lastmod` olarak kullanılmıyor; doğrulanmış güncelleme tarihi olmadığı için lastmod eklenmedi.
- Standart sitemap image extension alanında 8 koleksiyonun 69 gerçek fotoğraf URL'si temsil ediliyor. Ayrı image sitemap dosyası oluşturulmadı. Fotoğraflar için yeni detay/SEO sayfası oluşturulmadı.
- JSON-LD: ana sayfada WebSite/WebPage; koleksiyon ve liste sayfalarında CollectionPage; diğer içeriklerde WebPage; alt sayfalarda BreadcrumbList. Sahte işletme, review, rating veya ödül eklenmedi. JSON script çıktısında `<` karakterleri escape ediliyor.
- Yazılardaki bilinen koleksiyon fotoğrafları için mevcut kategori alt metinleri kullanıldı. Kaynağı bilinmeyen dekoratif görseller için hayali açıklama yazılmadı.

### Dosyalar

Değiştirilen dosyalar (`web/src/` altında):

| Dosya | Değişiklik |
|---|---|
| `lib/site.ts` | www temel adresi ve doğal genel description |
| `app/page.tsx` | Ana sayfa metadata ve JSON-LD |
| `app/kadraj-yansimalari/page.tsx` | Koleksiyon listesi metadata ve JSON-LD |
| `app/kadrajin-otesi/page.tsx` | Yazı listesi metadata ve JSON-LD |
| `app/mavi-kadraj-kimdir/page.tsx` | Kimlik sayfası metadata ve JSON-LD |
| `app/[slug]/page.tsx` | Gerçek koleksiyonlara özel metadata, kapak görseli ve JSON-LD |
| `app/kadrajin-otesi/[slug]/page.tsx` | Yazıya özel canonical/sosyal metadata ve JSON-LD |
| `components/KadrajinOtesiReading.tsx` | Bilinen fotoğrafların mevcut alt metinlerini kullanma |

Yeni kod dosyaları (`web/src/` altında):

- `lib/seo.ts`: yalnızca SEO metadata üretimi için ortak yardımcı.
- `components/PageStructuredData.tsx`: görünür tasarımı değiştirmeyen JSON-LD.
- `app/sitemap.ts`: gerçek verilerden sitemap ve görsel URL'leri.
- `app/robots.ts`: robots ve sitemap referansı.

Yeni rapor dosyası: `SEO-RAPORU.md`. Bu görevde silinen dosya yok. Paketler, CSS, hero, animasyonlar, galeri kartları ve responsive kurallar değişmedi.

### Indexlenebilir route'lar

Toplam **21** sayfa: 4 sabit sayfa, 8 koleksiyon, 9 yazı.

Sabit sayfalar: `/`, `/kadraj-yansimalari`, `/kadrajin-otesi`, `/mavi-kadraj-kimdir`.

Koleksiyonlar: `/gokceada`, `/bozcaada`, `/tirilye`, `/bolu`, `/kapadokya`, `/can-dostlarimiz`, `/gun-batimi`, `/rastgele-kadrajlar`.

Yazılar (`/kadrajin-otesi/` altında): `bir-yere-ait-olmadan-da-yasanir-mi`, `gec-kaldigimiz-seyler`, `ayni-yerden-baska-biri-olarak-gecmek`, `bazi-insanlar-fotografta-kalmaz`, `sessizligin-de-bir-sesi-var`, `fotografini-cekmedigim-anlar`, `isigin-pesinden`, `yolun-bittigi-yerde`, `kendine-donebilen-insan`.

Canonical'lar www domain'inde ilgili sayfanın yolunu kullanıyor. Localhost/preview/vercel.app canonical yok. Next.js ana sayfa canonical çıktısında sondaki slash'ı kaldırıyor; `https://www.mavikadraj.com.tr` ile `https://www.mavikadraj.com.tr/` aynı kök URL'yi ifade ediyor.

### Görseller, veri tutarlılığı ve performans

Bu sayılar **ana siteye** aittir; arşiv subdomain'inin toplamları değildir.

| Kontrol | Sonuç |
|---|---|
| Koleksiyon sayısı | 8 |
| Veri kaydı fotoğraf sayısı | 69 |
| Fiziksel koleksiyon fotoğrafı | 69 |
| Yerel public URL üzerinden 200 dönen koleksiyon fotoğrafı | 69 |
| Sitemap görsel sayısı | 69 |
| Eksik fiziksel kayıt / 404 görsel | 0 |

8 fotoğrafta EXIF yönü dikkate alındığında kayıtlı `6000 × 4000` yerine `4000 × 6000` ölçüsü gerekiyor:

- `/yansimalar/bozcaada/bozcaada7.JPG`
- `/yansimalar/bozcaada/bozcaada10.JPG`
- `/yansimalar/bozcaada/bozcaada11.JPG`
- `/yansimalar/tirilye/tirilye1.JPG`
- `/yansimalar/tirilye/tirilye2.JPG`
- `/yansimalar/tirilye/tirilye3.JPG`
- `/yansimalar/tirilye/tirilye5.JPG`
- `/yansimalar/tirilye/tirilye6.JPG`

Bu kayıtlar erişilebilir ve fotoğraf sayısını etkilemiyor. Boyut düzeltmesi galeri oranlarını/görünümünü etkileyebileceği için bu görevde uygulanmadı; görsel kontrolle ayrı değerlendirilmesi gerekiyor.

Next Image optimizasyonu, srcset/sizes, intrinsic ölçüler veya `fill` ile CSS alan rezervasyonu mevcut. Ana sayfa ilk HTML'sinde 23 responsive görsel var; hero lazy-load değil, diğer 22 görsel lazy-load. Hero priority ve mevcut preload davranışı korundu. Görseller async decoding kullanıyor. Orijinal dosyalara veya kalitelerine müdahale edilmedi; yeni thumbnail türevi üretilmedi.

Bu görevde performans mimarisi değiştirilmedi. Structured data ve metadata server çıktısında üretiliyor. Chrome DevTools/tarayıcı erişimi olmadığı için gerçek LCP, CLS, INP, indirilen ilk ekran görsel sayısı, font/bundle maliyeti veya ağ cache performansı ölçülmedi. Kod üzerinden değerlendirme, ölçüm sonucu olarak sunulmuyor.

### Linkler, eski URL'ler ve testler

- Üst menü/mobil menü Arşiv; Seçilmiş Kareler sonundaki `Tüm arşivi keşfet →`; footer Fotoğraf Arşivi bağlantıları mevcut. Hedef `https://arsiv.mavikadraj.com.tr/`; aynı sekmede, gerçek `<a>`, nofollow/tracking yok.
- Kullanıcıya açık kaynak kodda Sizden Gelenler referansı bulunmadı. Veritabanı migration geçmişi önceki görevde korundu; bu görevde de dokunulmadı.
- Eski `/sizden-gelenler`, `/admin/mavi-kadraj/sizden-gelenler` ve iki eski API endpointi yerelde 404 döndü. Eşdeğer içerik olmadığı için ana sayfaya rastgele redirect önerilmedi/eklenmedi.
- Canlı sitenin web aracından alınan görünümünde eski Sizden Gelenler bağlantıları hâlâ görünüyor. Yerel kod ile canlı çıktı farklı; deploy yapılmadığı için canlı ortamın güncellendiği iddia edilmiyor.
- Production build ve build içindeki TypeScript doğrulaması başarılı.
- `web` klasöründen `node_modules/.bin/eslint.cmd src` başarılı, uyarısız. Genel lint komutunun önceki çalışmalarda üretilmiş dosyaları taraması nedeniyle gerçek kaynak kapsamı açıkça seçildi. Ayrı test script'i mevcut değil.
- Yerel production server üzerinde sitemap/robots HTTP 200; 21 sayfanın tamamı HTTP 200 ve canonical uyumlu. Title/description benzersiz, her sayfada bir H1, OG/Twitter mevcut, noindex yok.
- Üretilen sayfalardaki 21 farklı internal bağlantı hedefinin tamamı HTTP 200. 69 sitemap görselinin tamamı HEAD isteğinde HTTP 200. 15 farklı OG görsel URL'si ve tüm ikonlar HTTP 200.
- JSON-LD çıktıları JSON olarak parse edildi; WebSite, WebPage, CollectionPage, BreadcrumbList türleri doğrulandı. Bu bir Google rich-result uygunluk garantisi değildir.
- Bilinmeyen test URL'si HTTP 404 döndü.
- `git diff --check` başarılı. Git LF → CRLF satır sonu uyarıları verdi; whitespace hatası yok.
- Desktop/tablet/mobile görünümü ve mobil menü açılma davranışı **görsel olarak doğrulanamadı**. CSS, layout ve interaction kodunun değişmemesi kaynak düzeyinde doğrulandı; bu durum responsive testin yerine geçmiyor.

Ana sitemap: **https://www.mavikadraj.com.tr/sitemap.xml**

Ana robots: **https://www.mavikadraj.com.tr/robots.txt**

## B) arsiv.mavikadraj.com.tr

Bu workspace içinde Fotoğraf Arşivi web uygulamasının kaynak kodu bulunmuyor. Ana sitenin 69 fotoğrafı arşivdeki yaklaşık 1.410 fotoğrafın yerine sayılmadı. Başka klasörlerde değişiklik yapılmadı.

Canlı arşiv URL'si web aracıyla erişilemedi. Bu, sitenin tüm kullanıcılar için kapalı olduğunu veya 404 döndüğünü kanıtlamaz.

Dolayısıyla arşiv için framework/routing, CSR/SSR, ilk HTML'de 0 sayacı, canonical, kategori landing page'leri, fotoğraf URL kopyalama, metadata, sitemap/image sitemap, robots, structured data, geri bağlantı, broken links, performans, responsive görünüm ve build/lint/test doğrulanamadı. Değiştirilen/yeni/silinen arşiv dosyası yok.

Gerçek kategori sayısı, indexlenebilir kategori sayısı, kayıt/fiziksel/public/UI fotoğraf sayıları, sayılar arasındaki fark, eksik kayıtlar, sitemap URL/görsel sayıları **bilinmiyor**. 1.410 ve 26 doğrulanmış sonuç olarak kullanılmadı.

Planlanan arşiv sitemap: `https://arsiv.mavikadraj.com.tr/sitemap.xml`. Planlanan robots: `https://arsiv.mavikadraj.com.tr/robots.txt`. Bu adreslerde doğru dosyaların mevcut olduğu doğrulanmadı; arşiv projesinde çalışma tamamlanmadan Search Console'a gönderilecek hazır sitemap olarak sunulmuyor.

## Production'a çıkmadan önce kontrol edilmesi gerekenler

1. Ana siteyi desktop/tablet/mobile tarayıcıda kontrol edin; menü, CTA, footer, galeri ve yatay taşmayı gözden geçirin.
2. EXIF yönü farklı 8 fotoğrafın galeri oranlarını ayrı görsel kontrolle değerlendirin.
3. Vercel'de www'nin production ana domain olduğunu ve non-www yönlendirmesinin tek adımda doğru çalıştığını kontrol edin. Bu görevde hosting domain ayarı veya yeni host redirect kuralı eklenmedi.
4. Deploy sonrası 21 sitemap sayfası, robots, canonical ve paylaşım görsellerini production URL'leri üzerinden yeniden doğrulayın; eski Sizden Gelenler bağlantılarının kalktığını kontrol edin.
5. Gerçek tarayıcı/DevTools ile LCP/CLS/INP ve cache/bundle ölçümünü tamamlayın.
6. Fotoğraf Arşivi uygulamasını kendi workspace'inde açıp B bölümündeki eksik denetim ve uygulamayı tamamlayın.
7. Ana site deploy'u doğrulandıktan sonra Domain Property içinde manuel gönderilecek hazır adres: `https://www.mavikadraj.com.tr/sitemap.xml`. Arşiv için kendi sitemap'i doğrulanana kadar gönderim yapmayın.

Uygulama referansları: [Next.js sitemap/image desteği](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap), [Next.js metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata), [Google image sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps).
