import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/collections";

export function CollectionPortal({ collection, className = "" }: { collection: Collection; className?: string }) {
  const image = collection.coverImage;
  return (
    <article className={`collection-portal reveal-up ${className}`}>
      <Link href={`/${collection.slug}`} className="collection-portal__image">
        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 92vw, 70vw" className="object-cover" />
      </Link>
      <div className="collection-portal__copy">
        <p>{collection.title}</p>
        <span>{collection.subtitle}</span>
      </div>
    </article>
  );
}
