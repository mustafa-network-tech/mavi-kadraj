export type CollectionImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

export type Collection = {
  slug: string;
  title: string;
  subtitle: string;
  coverImage: CollectionImage;
  images: CollectionImage[];
  interlude: [string, string];
  sideNotes: [string, string, string];
  symbol: string;
};

const image = (folder: string, file: string, width: number, height: number, title: string, caption: string): CollectionImage => ({
  src: `/yansimalar/${folder}/${file}`,
  alt: `${title} koleksiyonundan bir fotoğraf`,
  width,
  height,
  caption,
});

function makeCollection(slug: string, title: string, subtitle: string, folder: string, files: readonly [string, number, number][], captions: readonly string[], interlude: [string, string], sideNotes: [string, string, string], symbol: string, cover = 0): Collection {
  const images = files.map(([file, width, height], index) => image(folder, file, width, height, title, captions[index % captions.length]));
  return { slug, title, subtitle, coverImage: images[cover], images, interlude, sideNotes, symbol };
}

export const collections: Collection[] = [
  makeCollection("gokceada", "Gökçeada", "Rüzgârın sessizliğe karıştığı yer.", "gokceada", [
    ["gokceada1.JPG",6000,4000],["gokceada2.JPG",6000,4000],["gokceada3.JPG",5344,3563],["gokceada4.JPG",6000,4000],["gokceada5.JPG",6000,4000],["gokceada6.JPG",6000,4000],["gokceada7.JPG",6000,4000],["gokceada8.JPG",6000,4000],["gokceada9.JPG",6000,4000],["gokceada10.JPG",6000,4000],["gokceada11.JPG",6000,4000]
  ], ["Rüzgârın bıraktığı sessizlik.","Gökyüzü biraz daha mavi kaldı.","Uzakta, acele etmeyen bir gün.","Sessizliğin de bir rengi var.","Ada, ışığı usulca saklıyor."], ["Rüzgârın sesi bazen bir yerin hafızasıdır.","Uzaklaştıkça değil, sustukça duyulan bir ada."], ["Uzaklık bazen insanı kendine yaklaştırır.","Rüzgârın sessizliğe karıştığı yer.","Bir ada; biraz yalnızlık, biraz özgürlük."], "🕊️", 4),
  makeCollection("bozcaada", "Bozcaada", "Taş sokaklardan denize kalan hatıralar.", "bozcaada", [
    ["bozcaada1.JPG",6000,4000],["bozcaada2.JPG",6000,4000],["bozcaada3.JPG",6000,4000],["bozcaada4.JPG",6000,4000],["bozcaada5.JPG",6000,4000],["bozcaada6.JPG",6000,4000],["bozcaada7.JPG",6000,4000],["bozcaada8.JPG",6000,4000],["bozcaada9.JPG",6000,4000],["bozcaada10.JPG",6000,4000],["bozcaada11.JPG",6000,4000]
  ], ["Taşın hafızası uzun.","Akşam ışığı acele etmez.","Bir sokak, yüz hatıra.","Rüzgâr burada yolu biliyor.","Denize kalan eski bir gün."], ["Taş sokaklara biraz deniz, biraz akşam sinmiş.","Rüzgâr burada her sokağın adını biliyor."], ["Rüzgâr burada hep bir şey anlatır.","Denizin karşısında acele etmek anlamsızlaşır.","Bazı adalar karadan çok hatıraya bağlıdır."], "🌼", 2),
  makeCollection("tirilye", "Tirilye", "Bir günün içine sığan eski zamanlar.", "tirilye", [
    ["tirilye1.JPG",6000,4000],["tirilye2.JPG",6000,4000],["tirilye3.JPG",6000,4000],["tirilye4.JPG",6000,4000],["tirilye5.JPG",6000,4000],["tirilye6.JPG",6000,4000]
  ], ["Eski zamanların kıyısında.","Bir gün usulca geride kaldı.","Sokak döner, zaman bekler.","Hatırası ışıkta kaldı."], ["Eski zamanlar bazen bir pencerenin önünde bekler.","Bir sokak döner, zaman biraz geride kalır."], ["Bir sokak, bir öğleden sonrayı saklar.","Denize çıkan her yol biraz yavaşlatır insanı.","Eski evler bazı hikâyeleri hâlâ hatırlar."], "🌷", 3),
  makeCollection("bolu", "Bolu", "Yeşilin sessizliğinde.", "bolu", [
    ["bolu1.JPG",6000,4000],["bolu2.JPG",6000,4000],["bolu3.JPG",6000,4000],["bolu4.JPG",6000,4000],["bolu5.JPG",6000,4000],["bolu6.JPG",6000,4000],["bolu7.jpg",1350,2400],["bolu8.JPG",6000,4000],["bolu9.JPG",6000,4000],["bolu10.JPG",6000,4000],["bolu11.JPG",6000,4000]
  ], ["Yeşilin içinde sesler yavaşlar.","Bir nefes kadar sakin.","Yol, sessizliğe karıştı.","Gökyüzü burada dinleniyor.","Doğa acele etmiyor."], ["Yeşilin içinde sesler bile yavaşlar.","Bazen göl, gökyüzünün sustuğu yerdir."], ["Orman sustuğunda su konuşmaya başlar.","Yeşilin de bir sessizliği vardır.","Yol bazen eve değil, kendine çıkar."], "🌲", 5),
  makeCollection("kapadokya", "Kapadokya", "Taşın, göğün ve zamanın arasında.", "kapadokya", [
    ["kapadokya1.jpg",1080,2400],["kapadokya2.jpg",1800,4000],["kapadokya3.jpg",3907,1800],["kapadokya4.jpg",1800,4000]
  ], ["Taşın zamanı daha uzun.","Göğe yakın bir sessizlik.","Işık, zamana dokundu.","Bir an yükseldi, sonra kaldı."], ["Taşın zamanı, insanınkinden daha uzun.","Gökyüzüne yükselen yalnızca hayaller değildir."], ["Gökyüzüne bakınca mesafeler biraz küçülür.","Taş, zamanı başka türlü hatırlar.","Uzaklık burada sessizce değişir."], "✨", 2),
  makeCollection("can-dostlarimiz", "Can Dostlarımız", "Aynı dünyayı sessizce paylaştıklarımız.", "can dostlarımız", [
    ["dost1.jpg",4553,4000],["dost2.JPG",6000,4000],["dost3.jpg",3120,4160],["dost4.jpg",1350,2400],["dost5.JPG",6000,4000]
  ], ["Bir bakış yeter.","Sessizce aynı dünyada.","Bütün cümlelerden uzun.","Yakınlığın en sade hâli.","Sevgi, ses istemez."], ["Bizi anlamak için dilimize ihtiyaçları yok.","Bir bakış, bazen bütün cümlelerden uzun."], ["Her karşılaşma biraz iz bırakır.","Bir bakış, bütün cümlelerden uzun.","Sessiz yakınlık da bir dildir."], "🐕", 2),
  makeCollection("gun-batimi", "Gün Batımı", "Günün ışığa bıraktığı son söz.", "gunbatımı", [
    ["gb1.jpeg",1365,2048],["gb2.JPG",6000,3454],["gb3.jpg",1985,1800],["gb4.JPG",5028,2874],["gb5.jpg",1064,1280],["gb6.JPG",6000,4000],["gb7.JPG",3345,4000],["gb8.jpeg",1066,1600],["gb9.jpeg",1600,1066],["gb10.JPG",6000,4000]
  ], ["Gün gider, ışık kalır.","Akşam kendini yavaşça topladı.","Gökyüzünün son sözü.","Işık biraz daha kalsın…","Veda her gün başka renkte."], ["Gün gider. Işık biraz daha kalır.","Gökyüzünün vedası hiçbir gün aynı değil."], ["Işık çekilirken renkler konuşur.","Akşam, günün en güzel susuşudur.","Son ışık bazen ilk hatıradır."], "🌄", 3),
  makeCollection("rastgele-kadrajlar", "Rastgele Kadrajlar", "Planlanmayan anların bıraktığı izler.", "rastgele-kadraj", [
    ["IMG_2928.JPG",6000,4000],["rk2.JPG",6000,4000],["rk3.JPG",6000,4000],["rk4.JPG",3377,3068],["rk5.jpg",1500,1000],["rk6.JPG",3063,3829],["rk7.JPG",5124,2806],["rk8.JPG",6000,4000],["rk9.jpg",1634,977],["rk10.jpeg",1536,1412],["rk11.jpeg",1260,1065]
  ], ["Bir an, sonra sessizlik.","Gözün durduğu yerde.","Planlanmayan güzel bir iz.","Yol bazen vardığın yerdir.","Hikâye kendiliğinden başladı."], ["Bazı karelerin planı yoktur. Sadece zamanı vardır.","Gözün durduğu yerde, hikâye başlar."], ["Bir şehir bazen tek bir kareye sığmaz.","Plan yoktu; yalnızca o an vardı.","Gözün durduğu yerde hikâye başlar."], "✨", 6),
];

export const collectionBySlug = Object.fromEntries(collections.map((collection) => [collection.slug, collection]));
