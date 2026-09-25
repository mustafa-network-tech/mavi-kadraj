import { pageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/PageStructuredData";
import { ExhibitionHeader } from "@/components/ExhibitionHeader";
import { ExhibitionFooter } from "@/components/ExhibitionFooter";
import { PhotoMapApp } from "@/components/map/PhotoMapApp";
import { loadArchiveMapData } from "@/lib/map/archive-source";

const description = "Mavi Kadraj objektifinden Türkiye’nin farklı noktaları. Fotoğraf Haritası ile çekim noktalarını keşfedin.";
export const metadata = pageMetadata("/harita", "Fotoğraf Haritası", description);

/** Konum verisi arşivden saatlik yenilenir (ISR); harita ana sitenin kendi bileşenleriyle çizilir. */
export const revalidate = 3600;

export default async function HaritaPage() {
  const dataset = await loadArchiveMapData();
  return (
    <main className="exhibition-page map-page">
      <PageStructuredData path="/harita" name="Fotoğraf Haritası" description={description} />
      <ExhibitionHeader />
      <PhotoMapApp dataset={dataset} />
      <ExhibitionFooter />
    </main>
  );
}
