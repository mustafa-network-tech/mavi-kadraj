import type { Metadata } from "next";
import { Fragment } from "react";
import { CollectionPortal } from "@/components/CollectionPortal";
import { ExhibitionHeader } from "@/components/ExhibitionHeader";
import { ExhibitionFooter } from "@/components/ExhibitionFooter";
import { collections } from "@/lib/collections";

export const metadata: Metadata = { title: "Kadraj Yansımaları", description: "Biriktirdiğim yerler, ışıklar ve sessiz anlar." };

export default function KadrajYansimalariPage() {
  return (
    <main className="exhibition-page reflections-page">
      <ExhibitionHeader />
      <header className="reflections-intro">
        <h1>Kadraj<br /><em>Yansımaları</em></h1>
        <p>Biriktirdiğim yerler,<br />ışıklar ve sessiz anlar.</p>
      </header>
      <section className="collection-exhibition" aria-label="Fotoğraf koleksiyonları">
        {collections.map((collection, i) => <Fragment key={collection.slug}><CollectionPortal collection={collection} className={`portal-${i + 1}`} />{i === 1 && <aside className="collection-pause"><span aria-hidden>🕊️</span><p>Ada sustuğunda,<br /><em>rüzgâr konuşmaya başlar.</em></p></aside>}{i === 4 && <aside className="collection-pause collection-pause--flower"><span aria-hidden>🌼</span><p>Bazı yolların dönüşü yoktur.<br /><em>İnsan dönerken aynı insan değildir.</em></p></aside>}</Fragment>)}
      </section>
      <ExhibitionFooter />
    </main>
  );
}
