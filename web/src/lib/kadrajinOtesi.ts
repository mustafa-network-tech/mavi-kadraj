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
    slug: "fotografini-cekmedigim-anlar",
    title: "Fotoğrafını Çekmediğim Anlar",
    dateLabel: "Temmuz 2026",
    publishedAt: "2026-07-12",
    seriesNumber: 4,
    seriesLabel: "Kadrajın ötesi",
    description: "Bazen deklanşöre basmamak ve bir anı yalnızca kendine saklamak üzerine.",
    ogImage: "/og/kadrajin-otesi/kendine-donebilen-insan.jpg",
  },
  {
    slug: "isigin-pesinden",
    title: "Işığın Peşinden",
    dateLabel: "Mayıs 2026",
    publishedAt: "2026-05-24",
    seriesNumber: 3,
    seriesLabel: "Kadrajın ötesi",
    description: "Işığı ararken yolun ve bekleyişin içinde bulunanlar üzerine.",
    ogImage: "/og/kadrajin-otesi/kendine-donebilen-insan.jpg",
  },
  {
    slug: "yolun-bittigi-yerde",
    title: "Yolun Bittiği Yerde",
    dateLabel: "Nisan 2026",
    publishedAt: "2026-04-08",
    seriesNumber: 2,
    seriesLabel: "Kadrajın ötesi",
    description: "Bir yolun sonuyla insanın içinde başlayan başka bir yol üzerine.",
    ogImage: "/og/kadrajin-otesi/kendine-donebilen-insan.jpg",
  },
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

const yolunBittigiYerdeParagraphs = [
  "Bazı yollar bir tabelayla bitmez. Asfalt incelir, taşlar çoğalır, sonra önünde yalnızca sessiz bir açıklık kalır. Harita orada susar. İnsanın içindeki yol ise tam o anda konuşmaya başlar.",
  "Uzun süre varacağım yeri düşünerek yürüdüm. Bir manzaraya, küçük bir kıyıya, kimsenin bilmediği bir sokağa ulaşınca yolun anlam kazanacağını sandım. Oysa yol, benden habersiz beni değiştiriyordu.",
  "Fotoğraf makinesi omzumdaydı ama acelem yoktu. Bazen karşıma çıkan şey bir kare değildi; durup nefes almamı isteyen bir gölge, uzaktan gelen bir ses, yüzünü görmediğim birinin bıraktığı ayak iziydi.",
  "İnsan yolda en çok kendi sessizliğini duyar. Günlük hayatın içinde üstünü örttüğü sorular, rüzgârın boşluk bulduğu yerlerden yeniden içeri girer. Cevap vermek gerekmez. Yürümek bazen yeterlidir.",
  "Yolun bittiği yerde bir süre bekledim. Önümde gidilecek bir çizgi kalmamıştı. İlk kez geriye bakmadan olduğum yerde durabildim. Belki de varmak, ilerlemenin değil durabilmenin başka bir adıydı.",
  "O gün çok az fotoğraf çektim. Çektiklerimin çoğunda büyük bir olay yoktu: taşın üzerine düşen ışık, uzakta birbirine karışan iki renk, rüzgârla eğilmiş bir dal. Fakat o küçük şeylerde yolun bütün ağırlığı vardı.",
  "Dönerken aynı yerlerden geçtim ama yol aynı değildi. Çünkü insan bir yerden dönerken yalnızca yönünü değiştirmez. Bakışını, sesini ve yanında taşıdığı sessizliği de değiştirir.",
  "Şimdi bazı fotoğraflara baktığımda nerede çekildiklerini hemen hatırlamıyorum. Yine de o yolun bittiği yerde içimde başlayan şeyi tanıyorum. Bazen bir kare, gidilen yeri değil; geri dönen insanı saklar.",
] as const;

const isiginPesindenParagraphs = [
  "Işığın bir saati vardır ama dakikası yoktur. Ne zaman geleceğini yaklaşık bilirsin; nasıl geleceğini hiçbir zaman. Bu yüzden fotoğraf çekmek biraz hazırlanmak, daha çok beklemektir.",
  "Sabahın erken vaktinde çıktığım yollar oldu. Şehir henüz kendine gelmemişken, kepenkler kapalı ve sokaklar serinken yürüdüm. Aradığım ışık bazen bir duvarın kenarında birkaç saniye kaldı, bazen hiç gelmedi.",
  "Önceleri gelmeyen ışığı kayıp sayardım. Sonra beklerken gördüklerimin, çektiğim karelerden daha kalabalık olduğunu fark ettim. Bir pencerenin açılışı, uzaktan yaklaşan ayak sesi, sokağın renginin yavaşça değişmesi…",
  "Işık yalnızca gördüğümüz şeyi aydınlatmaz. Nereye bakacağımızı da söyler. Aynı yolun içinden yüz kez geçersin; bir gün küçük bir aydınlık, daha önce hiç görmediğin bir ayrıntıyı sana emanet eder.",
  "Gün batımına yetişmek için acele ettiğim zamanlar da oldu. Son virajı döndüğümde güneş çoktan kaybolmuştu. Gökyüzünde yalnızca vedasının soluk rengi vardı. Makineyi kaldırdım ve o eksik ışığın fotoğrafını çektim.",
  "Belki ışığın peşinden gitmek, onu yakalamak değildir. Geç kalmayı, yanılmayı, beklemeyi kabul etmektir. Çünkü iyi bir an bazen planladığın yerde değil, ona giderken durduğun yerde seni bulur.",
  "Fotoğrafın içinde görünen aydınlık kadar görünmeyen karanlık da vardır. Biri diğerini eksiltmez. Tam tersine, ikisi yan yana geldiğinde kare nefes almaya başlar.",
  "Bugün ışığı ararken daha yavaş yürüyorum. Onun benden kaçmadığını biliyorum. Sadece her defasında başka bir yerde, başka bir biçimde karşıma çıkıyor. Benim yapmam gereken yetişmek değil; fark edecek kadar orada kalmak.",
] as const;

const cekmedigimAnlarParagraphs = [
  "Bazı anlarda elim makineye gider, sonra durur. Işık güzeldir, yüzler sakindir, her şey fotoğraf olmaya hazır görünür. Yine de deklanşöre basmam. Çünkü bazı anlar kaydedilince çoğalmaz; yalnızca bölünür.",
  "Bir keresinde deniz kıyısında uzun süre oturdum. Ufuk yavaşça rengini değiştirdi. Yanımdaki sessizlik, söylenebilecek bütün cümlelerden daha yerindeydi. O ânın fotoğrafı yok. Fakat hâlâ en net hatırladıklarımdan biri.",
  "Fotoğraf çekmek, bakışın bir biçimidir. Çekmemek de öyle. Makineyi indirdiğimde gördüğüm şey kaybolmaz; yalnızca başkasına gösteremeyeceğim bir yere, hafızanın daha kırılgan tarafına yerleşir.",
  "Her şeyi saklamak istediğimiz bir zamandayız. Gördüğümüzü, yediğimizi, geçtiğimiz yolu… Sanki kaydetmezsek yaşanmamış olacak. Oysa hayatın bir kısmı kanıtsız kalmayı hak eder.",
  "Çekmediğim anlarda kadrajın sınırları kalkıyor. Sağda ne vardı, ışık nereden geliyordu, görüntünün dışında kim duruyordu diye düşünmüyorum. An, olduğu kadar geniş kalıyor.",
  "Elbette sonradan pişman olduğum oldu. Keşke o bakışı, o yolu, o kısa karşılaşmayı saklasaydım dedim. Sonra hatırlamanın kusursuz olmadığını; tam da bu yüzden bize ait olduğunu anladım.",
  "Bazı fotoğraflar yıllar sonra bile ayrıntılarını korur. Bazı hatıralarsa her dönüşümüzde başka bir renge bürünür. Hangisinin daha gerçek olduğunu bilmiyorum. Belki gerçeklik de ışık gibi, baktığımız saate göre değişir.",
  "Şimdi makineyi ne zaman kaldıracağımı bildiğim kadar ne zaman indirmem gerektiğini de öğreniyorum. Fotoğrafını çekmediğim anlar arşivimde görünmüyor. Yine de bütün karelerin arasında, sessizce onlar duruyor.",
] as const;

export const kadrajinOtesiBodies: Record<string, readonly string[]> = {
  "kendine-donebilen-insan": kendineDonebilenInsanParagraphs,
  "yolun-bittigi-yerde": yolunBittigiYerdeParagraphs,
  "isigin-pesinden": isiginPesindenParagraphs,
  "fotografini-cekmedigim-anlar": cekmedigimAnlarParagraphs,
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
