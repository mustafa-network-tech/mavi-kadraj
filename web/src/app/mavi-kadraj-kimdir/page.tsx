import Image from "next/image";
import type { Metadata } from "next";
import { ExhibitionHeader } from "@/components/ExhibitionHeader";
import { ExhibitionFooter } from "@/components/ExhibitionFooter";

export const metadata: Metadata = {
  title: "Mavi Kadraj Kimdir?",
  description: "Mustafa Öner'in dünyaya biraz daha yavaş bakma biçimi: Mavi Kadraj.",
};

function AboutSection({ label, title, children, className = "" }: { label: string; title: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`about-section ${className}`}>
      <p className="about-section__label">{label}</p>
      <div className="about-section__content">
        <h2>{title}</h2>
        <div className="about-section__prose">{children}</div>
      </div>
    </section>
  );
}

export default function MaviKadrajKimdirPage() {
  return (
    <main className="exhibition-page about-page">
      <ExhibitionHeader />

      <header className="about-hero">
        <Image className="about-hero__image" src="/yansimalar/gokceada/gokceada2.JPG" alt="Deniz ve gökyüzü önünde insan silüeti" fill priority sizes="100vw" />
        <div className="about-hero__overlay" aria-hidden />
        <div className="about-hero__copy">
          <p>MAVİ KADRAJ KİMDİR?</p>
          <h1>Bazı insanlar fotoğraf çeker.<br /><em>Bazıları önce hisseder.</em></h1>
          <blockquote>Mavi Kadraj, Mustafa Öner&apos;in dünyaya biraz daha yavaş bakma biçimi.</blockquote>
        </div>
      </header>

      <div className="about-sections">
        <AboutSection label="BİR İSİMDEN ÖNCE BİR BAKIŞ" title="Mavi Kadraj bir fotoğraf sayfası olarak başlamadı.">
          <p>Mavi Kadraj&apos;ın tam olarak ne zaman başladığını söylemek zor.</p>
          <p>Belki ilk fotoğraf makinesini elime aldığım gün değildi. Belki sosyal medyada ilk kareyi paylaştığım gün de değildi.</p>
          <p>Sanırım çok daha önce başladı.</p>
          <p>Bir ağacın altında gereğinden fazla durduğumda, gün batarken eve dönmek yerine ışığın biraz daha değişmesini beklediğimde, kimsenin dönüp bakmadığı bir sokağın neden bana güzel geldiğini anlamaya çalıştığımda…</p>
          <p>Ben fotoğrafa hiçbir zaman yalnızca görüntü kaydetmek için bakmadım.</p>
          <p>Fotoğraf benim için biraz durmak oldu.</p>
          <p>Biraz susmak.</p>
          <p>Bazen de herkesin geçtiği bir yerde, geçmemek.</p>
          <p>Mavi Kadraj adı sonradan geldi.</p>
          <p>Bakış daha önce vardı.</p>
        </AboutSection>

        <AboutSection label="OSMANİYE" title={<>Bazı yerlerden ayrılırsın.<br />Bazı yerler senden ayrılmaz.</>} className="about-section--osmaniye">
          <p>Osmaniye benim için yalnızca haritada başlayan bir hikâye değil.</p>
          <p>Çocukluğun bildiği sıcaklık, dağların uzaktan görünüşü, toprağın rengi ve insanın yıllar sonra bile tanıdığı o memleket hissi…</p>
          <p>İnsan büyüdükçe başka şehirlere gidiyor.</p>
          <p>Başka yollar öğreniyor.</p>
          <p>Ama ilk baktığı coğrafyanın bazı renklerini yanında taşıyor.</p>
          <p>Belki bugün doğaya bu kadar uzun bakmamın bir tarafında da bu var.</p>
          <p>Bir manzaraya baktığımda yalnızca önümde olanı görmüyorum. Bazen çok uzakta kalmış başka bir yer de aynı kadrajın içine sessizce giriyor.</p>
          <p>Memleket biraz böyledir.</p>
          <p>Fotoğrafta görünmez.</p>
          <p>Ama bakışın içinde kalır.</p>
        </AboutSection>

        <AboutSection label="BOLU" title="Sonra yeşilin başka bir dilini öğrendim." className="about-section--with-image">
          <p>Bolu bana doğanın yalnızca seyredilecek bir şey olmadığını yeniden hatırlattı.</p>
          <p>Ormanların içinde yürüdükçe insanın sesi azalıyor.</p>
          <p>Şehir geride kalıyor.</p>
          <p>Bir süre sonra yaprakların, suyun ve rüzgârın kendi düzeni kalıyor.</p>
          <figure className="about-photo about-photo--wide reveal-up"><Image src="/yansimalar/bolu/bolu2.JPG" alt="Orman ağaçlarının arasından görünen göl" width={6000} height={4000} sizes="(max-width: 767px) 100vw, 72vw" /></figure>
          <p>Fotoğraf makinesiyle çıktığım bazı günlerde onlarca kareyle döndüm.</p>
          <p>Bazı günlerde ise neredeyse hiçbir şey çekmedim.</p>
          <p>İkisinden de aynı ölçüde memnun olduğum zamanlar oldu.</p>
          <p>Çünkü zamanla şunu öğrendim:</p>
          <p>Bir yere fotoğraf çekmek için gitmekle, bir yerde bulunurken fotoğraf çekmek aynı şey değil.</p>
          <p>Ben ikincisini daha çok sevdim.</p>
          <p>Bolu&apos;nun Mavi Kadraj&apos;daki yeri biraz da bu yüzden başka.</p>
          <p>Yeşil burada yalnızca bir renk değil.</p>
          <p>Bazen insanın zihnini susturan bir boşluk.</p>
        </AboutSection>

        <AboutSection label="ÇANAKKALE" title="Denizin karşısında insan biraz daha az konuşuyor." className="about-section--with-image">
          <p>Çanakkale başka bir ışık öğretti bana.</p>
          <p>Denizin üzerinde değişen gökyüzünü, rüzgârın bir manzarayı birkaç dakika içinde başka bir şeye dönüştürebildiğini ve aynı kıyının hiçbir akşam gerçekten aynı olmadığını…</p>
          <p>Bazen gün batımını çekmek için çıktım.</p>
          <p>Bazen gün batımı beni yolda yakaladı.</p>
          <p>Gökçeada&apos;da, Bozcaada&apos;da, kıyıda veya adını sonradan unuttuğum küçük bir yerde…</p>
          <figure className="about-photo about-photo--offset reveal-up"><Image src="/yansimalar/gokceada/gokceada8.JPG" alt="Gökçeada kıyısında günün son ışığı" width={6000} height={4000} sizes="(max-width: 767px) 100vw, 66vw" /></figure>
          <p>Makineyi kaldırdığım anlar kadar indirdiğim anları da sevmeye başladım.</p>
          <p>Çünkü deniz insana garip bir şey öğretiyor:</p>
          <p>Her güzel şeyin fotoğrafını çekmek gerekmiyor.</p>
          <p>Bazı şeylerin karşısında bulunmak yetiyor.</p>
        </AboutSection>

        <aside className="about-quote">
          <blockquote>“Ben güzel olanı aramıyorum.<br />Beni durduran şeyi arıyorum.”</blockquote>
          <p>— Mustafa Öner</p>
        </aside>

        <AboutSection label="NEDEN FOTOĞRAF?" title={<>Çünkü bazı şeyleri anlatmak istemiyorum.<br />Göstermek de istemiyorum.<br />Yalnızca kaybolmasınlar istiyorum.</>} className="about-section--with-image">
          <p>Fotoğraf benim için hiçbir zaman kusursuz karelerin peşinden koşmak olmadı.</p>
          <p>Bazen teknik olarak eksik bir fotoğraf, kusursuz bir fotoğraftan daha fazla şey anlatabilir.</p>
          <p>Bir bakış.</p><p>Boş bir sandalye.</p><p>Yağmurdan sonra kalan bir sokak.</p><p>Denizin kenarında tek başına duran biri.</p><p>Bir kedi.</p><p>Eski bir ev.</p><p>Günün son birkaç dakikası…</p>
          <figure className="about-photo about-photo--detail reveal-up"><Image src="/yansimalar/bolu/bolu10.JPG" alt="Ormanın içinde ahşap bir su oluğu" width={6000} height={4000} sizes="(max-width: 767px) 88vw, 42vw" /></figure>
          <p>Bunların hiçbirinin büyük bir hikâyesi olmak zorunda değil.</p>
          <p>Hayat zaten çoğunlukla büyük olaylardan oluşmuyor.</p>
          <p>Hatırladığımız şeylerin önemli bir kısmı küçücük ayrıntılar.</p>
          <p>Mavi Kadraj biraz da onları kaybetmemek için var.</p>
        </AboutSection>

        <AboutSection label="KADRAJIN DIŞINDA" title="Her fotoğrafın dışında kalan başka bir hikâye vardır.">
          <p>Bir fotoğraf çektiğimizde dünyadan küçücük bir parçayı seçiyoruz.</p>
          <p>Kadrajın içine aldığımız kadar dışarıda bıraktığımız şeyler de var.</p>
          <p>Belki bu yüzden zamanla yalnızca fotoğraf paylaşmak yetmedi.</p>
          <p>Fotoğrafın öncesini, sonrasını ve bende bıraktığını da anlatmak istedim.</p>
          <p>Kadraj Yansımaları bunun bir tarafı.</p>
          <p>Kadrajın Ötesinde başka bir tarafı.</p>
          <p>Biri gördüklerim.</p>
          <p>Diğeri bazen gördüklerimin bende bıraktığı sessizlik.</p>
          <p>Mavi Kadraj ikisinin arasında bir yerde duruyor.</p>
          <p>Ne tamamen fotoğraf galerisi.</p>
          <p>Ne tamamen günlük.</p>
          <p>Belki en doğru tanımı şudur:</p>
          <p>Bir insanın baktığı dünyadan kendine saklamak istediği küçük parçalar.</p>
        </AboutSection>

        <section className="about-answer">
          <h2>Peki Mavi Kadraj kim?</h2>
          <div>
            <p>Mavi Kadraj&apos;ın arkasında Mustafa Öner var.</p>
            <p>Ama burası yalnızca Mustafa&apos;yı anlatmak için kurulmuş bir yer değil.</p>
            <p>Burada Osmaniye&apos;den kalan bir renk olabilir.</p><p>Bolu&apos;dan bir orman.</p><p>Çanakkale&apos;den bir gün batımı.</p><p>Bir sokak.</p><p>Bir yol.</p><p>Bir hayvanın bakışı.</p><p>Ya da fotoğrafını hiç çekmediğim bir an.</p>
            <p>Hepsinin ortak bir tarafı var:</p>
            <p>Bir zamanlar beni durdurdular.</p>
            <p>Ben de onları tamamen kaybetmemek için burada bıraktım.</p>
          </div>
        </section>
      </div>

      <section className="about-closing">
        <h2>Mavi Kadraj</h2>
        <p>Bakıp geçemediğim yerlerden kalanlar.</p>
        <span>— Mustafa Öner</span>
      </section>
      <ExhibitionFooter />
    </main>
  );
}
