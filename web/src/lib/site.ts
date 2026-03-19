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
 * Her kategori sayfasındaki galeri — WordPress’teki fotoğrafların URL’lerini buraya ekleyin.
 * Örnek görseller: picsum (geliştirme); üretimde kendi dosyalarınızla değiştirin.
 */
export const categoryGalleries: Record<ReflectionSlug, GalleryImage[]> = {
  sessizlik: [
    { src: "https://www.mavikadraj.com.tr/wp-content/uploads/2025/12/tepekoy4%E2%9C%A8-1024x683.jpg", alt: "Sessizlik", width: 1024, height: 683, caption: "Sesin olmadığı yerde, her şey daha net duyulur." },
    { src: "https://picsum.photos/seed/mk-sessiz-2/1200/800", alt: "Sessizlik", width: 1200, height: 800, caption: "Konuşmayan anlar, en çok anlatanlardır." },
    { src: "https://picsum.photos/seed/mk-sessiz-3/900/1200", alt: "Sessizlik", width: 900, height: 1200, caption: "Sessizlik, saklanan değil; fark edilen bir derinliktir." },
    { src: "https://picsum.photos/seed/mk-sessiz-4/1000/750", alt: "Sessizlik", width: 1000, height: 750, caption: "Rüzgârın bile uğramadığı bir yerde, zaman yavaşlar." },
    { src: "https://picsum.photos/seed/mk-sessiz-5/800/800", alt: "Sessizlik", width: 800, height: 800, caption: "Bazı anlar konuşmaz, sadece kalır." },
    { src: "https://picsum.photos/seed/mk-sessiz-6/1100/700", alt: "Sessizlik", width: 1100, height: 700, caption: "Gürültü geçer, sessizlik iz bırakır." },
    { src: "https://picsum.photos/seed/mk-sessiz-7/1000/800", alt: "Sessizlik", width: 1000, height: 800, caption: "Duyulmayan her şey, içimizde çoğalır." },
    { src: "https://picsum.photos/seed/mk-sessiz-8/1200/700", alt: "Sessizlik", width: 1200, height: 700, caption: "Sessizlik, görünenin ötesinde kalan ilk histir." },
  ],
  "zamanin-izleri": [
    { src: "https://www.mavikadraj.com.tr/wp-content/uploads/2025/12/kalekoy3%E2%9C%A8-2048x1365.jpg", alt: "Zamanın İzleri", width: 1200, height: 800, caption: "Zaman silmez; sadece görünmeyeni derinleştirir." },
    { src: "https://picsum.photos/seed/mk-zaman-2/1200/900", alt: "Zamanın İzleri", width: 1200, height: 900, caption: "Geçen her an, geride sessiz bir iz bırakır." },
    { src: "https://picsum.photos/seed/mk-zaman-3/900/1100", alt: "Zamanın İzleri", width: 900, height: 1100, caption: "Bazı izler kaybolmaz, sadece daha az görünür olur." },
    { src: "https://picsum.photos/seed/mk-zaman-4/1000/1000", alt: "Zamanın İzleri", width: 1000, height: 1000, caption: "Zaman dokunur; biz fark ettiğimiz kadar değişiriz." },
    { src: "https://picsum.photos/seed/mk-zaman-5/1300/780", alt: "Zamanın İzleri", width: 1300, height: 780, caption: "Eskimek değil, izlenmektir zamanın yaptığı." },
    { src: "https://picsum.photos/seed/mk-zaman-6/800/1200", alt: "Zamanın İzleri", width: 800, height: 1200, caption: "Her şey geçer derler… izleri kalır." },
    { src: "https://picsum.photos/seed/mk-zaman-7/1100/800", alt: "Zamanın İzleri", width: 1100, height: 800, caption: "Zaman, en çok hatırlanan yerlerde ağırlaşır." },
    { src: "https://picsum.photos/seed/mk-zaman-8/1000/900", alt: "Zamanın İzleri", width: 1000, height: 900, caption: "Bir iz kalıyorsa, zaman oradan geçmiştir." },
  ],
  "insan-izleri": [
    { src: "https://www.mavikadraj.com.tr/wp-content/uploads/2025/12/tasduvar_gul-768x512.jpg", alt: "İnsan İzleri", width: 768, height: 512, caption: "İnsan nereye dokunursa orada bir iz kalır." },
    { src: "https://picsum.photos/seed/mk-insan-2/1000/800", alt: "İnsan İzleri", width: 1000, height: 800, caption: "Sokaklar, yürüyenlerin sessiz hikâyesidir." },
    { src: "https://picsum.photos/seed/mk-insan-3/900/900", alt: "İnsan İzleri", width: 900, height: 900, caption: "Duvarlar bazen konuşur; insan eli yazar." },
    { src: "https://picsum.photos/seed/mk-insan-4/1200/800", alt: "İnsan İzleri", width: 1200, height: 800, caption: "Şehir, insanın bıraktığı izlerin toplamıdır." },
    { src: "https://picsum.photos/seed/mk-insan-5/800/1100", alt: "İnsan İzleri", width: 800, height: 1100, caption: "Bazen en derin iz, sessiz olandır." },
    { src: "https://picsum.photos/seed/mk-insan-6/1000/700", alt: "İnsan İzleri", width: 1000, height: 700, caption: "İz bırakmak, unutulmamak değil; dokunmaktır." },
    { src: "https://picsum.photos/seed/mk-insan-7/1100/900", alt: "İnsan İzleri", width: 1100, height: 900, caption: "Her kapı, bir insanın geçtiği yerdir." },
    { src: "https://picsum.photos/seed/mk-insan-8/900/800", alt: "İnsan İzleri", width: 900, height: 800, caption: "İnsan izi, bazen taşta, bazen bakışta kalır." },
  ],
  "sessiz-yoldaslar": [
    { src: "https://www.mavikadraj.com.tr/wp-content/uploads/2025/12/cropped-harabe-ev-_mavikadraj.mustafa-scaled-1-1024x682.jpg", alt: "Sessiz Yoldaşlar", width: 1024, height: 682, caption: "Onlar konuşmaz… ama hep anlar." },
    { src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1100", alt: "Sessiz Yoldaşlar", width: 1100, height: 750, caption: "Bir bakışları, bütün kelimelerden ağırdır." },
    { src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900", alt: "Sessiz Yoldaşlar", width: 900, height: 1000, caption: "Yanında sessizce duran, en gerçek olandır." },
    { src: "https://images.unsplash.com/photo-1606567595334-d39972c85dbe?q=80&w=1000&auto=format&fit=crop", alt: "Sessiz Yoldaşlar", width: 1000, height: 1000, caption: "Sadakat, en çok onlarda görünür." },
    { src: "https://images.unsplash.com/photo-1535930749574-1399327ce78f?w=1200", alt: "Sessiz Yoldaşlar", width: 1200, height: 900, caption: "Sevgi bazen bir kuyruğun sessiz hareketidir." },
    { src: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800", alt: "Sessiz Yoldaşlar", width: 800, height: 800, caption: "Gitmezler… sadece beklerler." },
    { src: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=1000", alt: "Sessiz Yoldaşlar", width: 1000, height: 850, caption: "Onlar için zaman yoktur; sadece sen varsın." },
    { src: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1100", alt: "Sessiz Yoldaşlar", width: 1100, height: 800, caption: "En temiz duygular, kelimesiz yaşanır." },
  ],
};
