/**
 * Kadrajın Ötesi — yazı arşivi (seri + tarih + OG görsel yolu).
 * Yeni yazı: bu dosyaya kayıt + gövdeyi kadrajinOtesiBodies içine ekleyin.
 */

export const KADRAJIN_OTESI_HIGHLIGHT_PHRASES = [
  "kendini sevmeyi",
  "kendine değer vermek",
  "kendi içinde kalabilmeli",
  "İyi ki varım",
  "hayatı kendin için yaşamak",
  "kendi içinde kalabilmektir",
  "kadrajın ötesi",
] as const;

export type KadrajinOtesiPostMeta = {
  slug: string;
  title: string;
  /** Görünen tarih (örn. "Mart 2025") */
  dateLabel: string;
  /** ISO tarih — sıralama ve Open Graph publishedTime */
  publishedAt: string;
  /** Seri numarası (arşiv hissi) */
  seriesNumber: number;
  /** Seri başlığı (küçük etiket) */
  seriesLabel: string;
  description: string;
  /**
   * Paylaşım görseli — public klasöründen kök-relative yol.
   * Örn: /og/kadrajin-otesi/kendine-donebilen-insan.jpg
   */
  ogImage: string;
};

export const kadrajinOtesiPosts: readonly KadrajinOtesiPostMeta[] = [
  {
    slug: "kendine-donebilen-insan",
    title: "Kendine Dönebilen İnsan",
    dateLabel: "Mart 2025",
    publishedAt: "2025-03-19",
    seriesNumber: 1,
    seriesLabel: "Kadrajın ötesi",
    description:
      "Hayat, mutluluk ve içe dönüş — sessiz, sinematik bir okuma. Mavi Kadraj.",
    ogImage: "/og/kadrajin-otesi/kendine-donebilen-insan.jpg",
  },
];

const kendineDonebilenInsanParagraphs = [
  "Hayat bazen insanı sessizce incitir, bazen de hiç beklemediği bir anda yüzüne bir tebessüm bırakır.\nNe tamamen karanlıktır, ne de bütünüyle aydınlık.\nİnsan çoğu zaman bu iki uç arasında, fark etmeden sürüklenir.",
  "Oysa insanın mutlu olması için çok da büyük şeylere ihtiyacı yoktur.\nBazen bir an, bazen bir nefes, bazen de sadece kendine dönüp bakmak yeterlidir.\nÇünkü mutluluk çoğu zaman dışarıda değil, içeride saklıdır.",
  "İnsan önce kendini sevmeyi öğrenmeli.\nAma bu sevgi, başkalarını yok sayan bir bencillik değil…\nKendine zarar vermeden, kendini eksiltmeden var olabilmenin dinginliği olmalı.",
  "Kendine değer vermek, en çok da zor zamanlarda anlam kazanır.\nHerkesin uzaklaştığı, her şeyin anlamını yitirdiği anlarda…\nİnsan yine de kendi içinde kalabilmeli.",
  "Öyle anlar gelir ki, en yakınların bile uzak gibi hissedilir.\nKardeşin, ailen, annen, baban…\nHepsi aynı yerde durur ama sen başka bir yerde kalırsın.",
  "Dünya o anlarda kapkaranlık görünür.\nNe yol bellidir ne yön.\nİnsan kendi içinde kaybolur, kendi sesini bile zor duyar.",
  "Ama işte tam da o anlarda, insanın kendine tutunabilmesi gerekir.\nHiçbir şeye değil, kimseye değil…\nSadece kendine.",
  `"İyi ki varım" diyebilmek…\nHiçbir şeye bağlı olmadan, sadece var olduğun için bunu hissedebilmek.\nBelki de en gerçek güç budur.`,
  "Hayatı kendin için yaşamak…\nAma bunu yaparken kalbini daraltmadan, dünyayı küçültmeden.\nSeverek, hissederek, fark ederek yaşamak.",
  "Çünkü bazen en büyük yolculuk, bir yere gitmek değil…\nKendi içinde kalabilmektir.\nVe belki de kadrajın ötesi, tam olarak buradan başlar.",
] as const;

export const kadrajinOtesiBodies: Record<string, readonly string[]> = {
  "kendine-donebilen-insan": kendineDonebilenInsanParagraphs,
};

export function getKadrajinOtesiPost(slug: string): KadrajinOtesiPostMeta | undefined {
  return kadrajinOtesiPosts.find((p) => p.slug === slug);
}

export function getKadrajinOtesiBody(slug: string): readonly string[] | undefined {
  return kadrajinOtesiBodies[slug];
}

/** Liste: yeniden eskiye */
export function kadrajinOtesiPostsSorted(): readonly KadrajinOtesiPostMeta[] {
  return [...kadrajinOtesiPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
