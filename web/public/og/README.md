# Open Graph (paylaşım) görselleri

Önerilen boyut: **1200 × 630 px** (JPG veya PNG).

Kodda kullanılan yapı (yüklediğiniz dosyalarla eşleşir):

| Ne için | Disk (`web/public/...`) | URL |
|--------|-------------------------|-----|
| **Genel site** (layout — çoğu alt sayfa varsayılanı) | `og/mavi-kadraj-og.jpg` | `/og/mavi-kadraj-og.jpg` |
| **Ana sayfa** | `og/ana-sayfa.jpg` | `/og/ana-sayfa.jpg` |
| **Kadrajın Ötesi — yazı** | `og/kadrajin-otesi/kendine-donebilen-insan.jpg` | `/og/kadrajin-otesi/kendine-donebilen-insan.jpg` |

Yeni yazı: `og/kadrajin-otesi/<slug>.jpg` + `src/lib/kadrajinOtesi.ts` içinde `ogImage` alanını güncelleyin.

Paylaşım önizlemesi güncellenmezse platform önbelleğini temizleyin veya yeniden deploy edin.
