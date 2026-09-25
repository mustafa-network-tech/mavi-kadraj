import { pageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/PageStructuredData";
import { ExhibitionHeader } from "@/components/ExhibitionHeader";
import { ExhibitionFooter } from "@/components/ExhibitionFooter";

const description = "Mavi Kadraj objektifinden Türkiye’nin farklı noktaları. Fotoğraf Haritası ile çekim noktalarını keşfedin.";
export const metadata = pageMetadata("/harita", "Fotoğraf Haritası", description);

/** Harita arşiv sitesinde yaşar; burada ?embed=1 ile yalnızca harita alanı gömülür. */
const mapUrl = "https://arsiv.mavikadraj.com.tr/harita?embed=1";

export default function HaritaPage() {
  return (
    <main className="exhibition-page map-embed-page">
      <PageStructuredData path="/harita" name="Fotoğraf Haritası" description={description} />
      <ExhibitionHeader />

      <header className="map-embed-intro">
        <p className="exhibition-kicker">Fotoğraf Haritası</p>
        <h1>Karelerin <em>çekildiği yerler.</em></h1>
        <p>{description}</p>
      </header>

      <iframe className="map-embed-frame" src={mapUrl} title="Mavi Kadraj Fotoğraf Haritası" referrerPolicy="strict-origin-when-cross-origin" />
      <p className="map-embed-fallback"><a href="https://arsiv.mavikadraj.com.tr/harita">Haritayı tam ekran aç ↗</a></p>

      <ExhibitionFooter />
    </main>
  );
}
