import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExhibitionHeader } from "@/components/ExhibitionHeader";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { ExhibitionFooter } from "@/components/ExhibitionFooter";
import { collectionBySlug, collections } from "@/lib/collections";

export function generateStaticParams() {
  return collections.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const collection = collectionBySlug[slug];
  if (collection) return { title: collection.title, description: collection.subtitle };
  return {};
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = collectionBySlug[slug];

  if (!collection) notFound();

  const current = collections.findIndex((item) => item.slug === slug);
  const next = collections[(current + 1) % collections.length];

  return (
    <main className="exhibition-page collection-page">
      <ExhibitionHeader />
      <header className="collection-intro">
        <Link href="/kadraj-yansimalari">← Kadraj Yansımaları</Link>
        <h1>{collection.title}</h1>
        <p>{collection.subtitle}</p>
      </header>
      <GalleryLightbox gallery={collection.images} interlude={collection.interlude} sideNotes={collection.sideNotes} symbol={collection.symbol} nextCollection={{ href: `/${next.slug}`, title: next.title }} />
      <Link href={`/${next.slug}`} className="next-collection"><span>Sıradaki koleksiyon</span>{next.title} →</Link>
      <ExhibitionFooter />
    </main>
  );
}
