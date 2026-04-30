/** Site genel ayarlar — WordPress yerine buradan yönetilir */

export const site = {
  name: "Mavi Kadraj",
  url: "https://www.mavikadraj.com.tr",
  description: "Sessiz kareler, iz bırakan sessizlik.",
} as const;

export const homeCopy = {
  taglineItalic: "sessiz kareler…",
  tagline: "iz bırakan sessizlik…",
  kimdirTitle: "MAVİ KADRAJ KİMDİR?",
  kimdir: [
    ["Sessiz kareler peşinde,", "acele etmeden bakan bir duruş."],
    ["Mavi Kadraj,", "görünenin ardından kalan izi arar…."],
  ] as const,
};

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** One sentence under the card; leave "" for blank. */
  caption?: string;
};

/**
 * Kadraj yansımaları — kapak görselleri.
 * cardFit: "contain" = oval içinde fotoğrafın tamamı görünür (yatay kareler için).
 */
export const reflections = [
  {
    slug: "sessizlik",
    label: "Sessizlik",
    /** Metin: başlığın hemen altında, fotoğraf kategorisini anlatan bir cümle. */
    intro: "",
    image:
      "https://www.mavikadraj.com.tr/wp-content/uploads/2025/12/tepekoy4%E2%9C%A8-1024x683.jpg",
    width: 1024,
    height: 683,
    cardFit: "contain" as const,
    cardAspect: "5/6" as const,
  },
  {
    slug: "zamanin-izleri",
    label: "Zamanın İzleri",
    intro: "",
    image:
      "https://www.mavikadraj.com.tr/wp-content/uploads/2025/12/kalekoy3%E2%9C%A8-2048x1365.jpg",
    width: 2048,
    height: 1365,
    cardFit: "contain" as const,
    cardAspect: "5/6" as const,
  },
  {
    slug: "insan-izleri",
    label: "İnsan İzleri",
    intro: "",
    image:
      "https://www.mavikadraj.com.tr/wp-content/uploads/2025/12/tasduvar_gul-768x512.jpg",
    width: 768,
    height: 512,
  },
  {
    slug: "sessiz-yoldaslar",
    label: "Sessiz Yoldaşlar",
    intro: "",
    image:
      "https://www.mavikadraj.com.tr/wp-content/uploads/2025/12/cropped-harabe-ev-_mavikadraj.mustafa-scaled-1-1024x682.jpg",
    width: 1024,
    height: 682,
  },
] as const;

export const videoReflection = {
  slug: "yasamdan-yansimalar",
  label: "Yaşamdan Yansımalar",
} as const;

/**
 * Yaşamdan Yansımalar sayfasındaki video listesi. YouTube ve TikTok karışık eklenebilir; 10–15 videoya çıkarılabilir.
 */
export type YasamdanVideoItem =
  | { type: "youtube"; embedId: string; title?: string }
  | { type: "tiktok"; videoId: string; citeUrl: string };

export const yasamdanYansimalarVideos: YasamdanVideoItem[] = [
  {
    type: "youtube",
    embedId: "g2IyQiO_Ty8",
    title: "Canlı izle — Yaşamdan Yansımalar",
  },
  {
    type: "tiktok",
    videoId: "7561073186801011975",
    citeUrl:
      "https://www.tiktok.com/@mustafanin_kadrajindan/video/7561073186801011975",
  },
  {
    type: "tiktok",
    videoId: "7522212050886544647",
    citeUrl:
      "https://www.tiktok.com/@mustafanin_kadrajindan/video/7522212050886544647",
  },
  {
    type: "tiktok",
    videoId: "7585104779337026837",
    citeUrl:
      "https://www.tiktok.com/@mustafanin_kadrajindan/video/7585104779337026837",
  },
  {
    type: "tiktok",
    videoId: "7583798992253750549",
    citeUrl:
      "https://www.tiktok.com/@mustafanin_kadrajindan/video/7583798992253750549",
  },
  {
    type: "tiktok",
    videoId: "7576595385204935957",
    citeUrl:
      "https://www.tiktok.com/@mustafanin_kadrajindan/video/7576595385204935957",
  },
  {
    type: "tiktok",
    videoId: "7574893502283255061",
    citeUrl:
      "https://www.tiktok.com/@mustafanin_kadrajindan/video/7574893502283255061",
  },
  {
    type: "tiktok",
    videoId: "7568203335040371989",
    citeUrl:
      "https://www.tiktok.com/@mustafanin_kadrajindan/video/7568203335040371989",
  },
  {
    type: "tiktok",
    videoId: "7567103571926191380",
    citeUrl:
      "https://www.tiktok.com/@mustafanin_kadrajindan/video/7567103571926191380",
  },
  {
    type: "tiktok",
    videoId: "7533728655877426440",
    citeUrl:
      "https://www.tiktok.com/@mustafanin_kadrajindan/video/7533728655877426440",
  },
  {
    type: "tiktok",
    videoId: "7522550723821767944",
    citeUrl:
      "https://www.tiktok.com/@mustafanin_kadrajindan/video/7522550723821767944",
  },
  {
    type: "tiktok",
    videoId: "7517401507285732615",
    citeUrl:
      "https://www.tiktok.com/@mustafanin_kadrajindan/video/7517401507285732615",
  },
];

export type ReflectionSlug = (typeof reflections)[number]["slug"];

/**
 * `public/yansimalar/` — dosya adları diskteki gibi (.jpg / .JPG ayrımı korunur).
 * Galeriler: 11 + 11 + 11 + 12 görsel; kapak (reflections.image) ayrıca WP’de kalır.
 */
const YANSIMALAR_FILES = [
  "yansimalar (1).JPG",
  "yansimalar (2).JPG",
  "yansimalar (3).JPG",
  "yansimalar (4).JPG",
  "yansimalar (5).JPG",
  "yansimalar (6).jpg",
  "yansimalar (7).JPG",
  "yansimalar (8).JPG",
  "yansimalar (9).JPG",
  "yansimalar (10).jpg",
  "yansimalar (11).JPG",
  "yansimalar (12).JPG",
  "yansimalar (13).JPG",
  "yansimalar (14).jpg",
  "yansimalar (15).JPG",
  "yansimalar (16).jpg",
  "yansimalar (17).jpg",
  "yansimalar (18).jpg",
  "yansimalar (19).jpg",
  "yansimalar (20).jpg",
  "yansimalar (21).JPG",
  "yansimalar (22).JPG",
  "yansimalar (23).jpg",
  "yansimalar (24).jpg",
  "yansimalar (25).JPG",
  "yansimalar (26).JPG",
  "yansimalar (27).JPG",
  "yansimalar (28).JPG",
  "yansimalar (29).JPG",
  "yansimalar (30).JPG",
  "yansimalar (31).JPG",
  "yansimalar (32).JPG",
  "yansimalar (33).JPG",
  "yansimalar (34).JPG",
  "yansimalar (35).JPG",
  "yansimalar (36).JPG",
  "yansimalar (37).jpg",
  "yansimalar (38).JPG",
  "yansimalar (39).JPG",
  "yansimalar (40).JPG",
  "yansimalar (41).JPG",
  "yansimalar (42).jpg",
  "yansimalar (43).JPG",
  "yansimalar (44).JPG",
  "yansimalar (45).jpg",
] as const;

/** Yerel yansıma görseli — URL’de boşluk güvenli */
function yansimaSrc(filename: string): string {
  return `/yansimalar/${encodeURIComponent(filename)}`;
}

const W = 1600;
const H = 1067;

function yansimaGalleryItems(
  files: readonly string[],
  label: string,
  captions: readonly string[],
): GalleryImage[] {
  return files.map((filename, i) => ({
    src: yansimaSrc(filename),
    alt: label,
    width: W,
    height: H,
    caption: captions[i % captions.length],
  }));
}

const CAP_SESSIZ = [
  "Sesin olmadığı yerde, her şey daha net duyulur.",
  "Konuşmayan anlar, en çok anlatanlardır.",
  "Sessizlik, saklanan değil; fark edilen bir derinliktir.",
  "Rüzgârın bile uğramadığı bir yerde, zaman yavaşlar.",
  "Bazı anlar konuşmaz, sadece kalır.",
  "Gürültü geçer, sessizlik iz bırakır.",
  "Duyulmayan her şey, içimizde çoğalır.",
  "Sessizlik, görünenin ötesinde kalan ilk histir.",
] as const;

const CAP_ZAMAN = [
  "Zaman silmez; sadece görünmeyeni derinleştirir.",
  "Geçen her an, geride sessiz bir iz bırakır.",
  "Bazı izler kaybolmaz, sadece daha az görünür olur.",
  "Zaman dokunur; biz fark ettiğimiz kadar değişiriz.",
  "Eskimek değil, izlenmektir zamanın yaptığı.",
  "Her şey geçer derler… izleri kalır.",
  "Zaman, en çok hatırlanan yerlerde ağırlaşır.",
  "Bir iz kalıyorsa, zaman oradan geçmiştir.",
] as const;

const CAP_INSAN = [
  "İnsan nereye dokunursa orada bir iz kalır.",
  "Sokaklar, yürüyenlerin sessiz hikâyesidir.",
  "Duvarlar bazen konuşur; insan eli yazar.",
  "Şehir, insanın bıraktığı izlerin toplamıdır.",
  "Bazen en derin iz, sessiz olandır.",
  "İz bırakmak, unutulmamak değil; dokunmaktır.",
  "Her kapı, bir insanın geçtiği yerdir.",
  "İnsan izi, bazen taşta, bazen bakışta kalır.",
] as const;

const CAP_YOLDAS = [
  "Onlar konuşmaz… ama hep anlar.",
  "Bir bakışları, bütün kelimelerden ağırdır.",
  "Yanında sessizce duran, en gerçek olandır.",
  "Sadakat, en çok onlarda görünür.",
  "Sevgi bazen bir kuyruğun sessiz hareketidir.",
  "Gitmezler… sadece beklerler.",
  "Onlar için zaman yoktur; sadece sen varsın.",
  "En temiz duygular, kelimesiz yaşanır.",
] as const;

export const categoryGalleries: Record<ReflectionSlug, GalleryImage[]> = {
  sessizlik: yansimaGalleryItems(YANSIMALAR_FILES.slice(0, 11), "Sessizlik", CAP_SESSIZ),
  "zamanin-izleri": yansimaGalleryItems(
    YANSIMALAR_FILES.slice(11, 22),
    "Zamanın İzleri",
    CAP_ZAMAN,
  ),
  "insan-izleri": yansimaGalleryItems(
    YANSIMALAR_FILES.slice(22, 33),
    "İnsan İzleri",
    CAP_INSAN,
  ),
  "sessiz-yoldaslar": yansimaGalleryItems(
    YANSIMALAR_FILES.slice(33, 45),
    "Sessiz Yoldaşlar",
    CAP_YOLDAS,
  ),
};
