"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type GalleryImage = { src: string; alt: string; width: number; height: number; caption: string };

export function GalleryLightbox({ gallery, interlude, sideNotes, symbol, nextCollection }: { gallery: GalleryImage[]; interlude: [string, string]; sideNotes: [string, string, string]; symbol: string; nextCollection?: { href: string; title: string } }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const close = useCallback(() => setOpenIndex(null), []);
  const go = useCallback((direction: number) => setOpenIndex((value) => value === null ? null : (value + direction + gallery.length) % gallery.length), [gallery.length]);

  useEffect(() => {
    if (openIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
      if (event.key === "Tab") {
        const nodes = document.querySelectorAll<HTMLElement>("[data-lightbox] button, [data-lightbox] a");
        if (!nodes.length) return;
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKey); opener.current?.focus(); };
  }, [openIndex, close, go]);

  return (
    <>
      <section id="editorial-gallery" className="editorial-gallery" aria-label="Koleksiyon fotoğrafları">
        {gallery.map((photo, index) => <div key={photo.src} className="contents">
          {index === Math.min(3, gallery.length - 1) && <aside className="gallery-interlude reveal-up"><span aria-hidden>{symbol}</span><p>{interlude[0]}</p><em>{interlude[1]}</em></aside>}
          <figure className={`gallery-photo gallery-photo--${(index % 6) + 1} reveal-${index % 3 === 0 ? "clip" : index % 3 === 1 ? "up" : "side"}`}>
            <button onClick={(event) => { opener.current = event.currentTarget; setOpenIndex(index); }} aria-label={`${index + 1}. fotoğrafı büyüt`}>
              <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} priority={index === 0} sizes="(max-width: 700px) 94vw, 68vw" />
            </button>
            <figcaption>{photo.caption}</figcaption>
            {[1, 2, 7].includes(index) && <p className="gallery-side-note"><span aria-hidden>{index === 2 ? symbol : ""}</span>{sideNotes[index === 1 ? 0 : index === 2 ? 1 : 2]}</p>}
          </figure>
        </div>)}
      </section>
      {openIndex !== null && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Fotoğraf görüntüleyici" data-lightbox onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
          <button ref={closeButton} className="lightbox-close" onClick={close} aria-label="Kapat">Kapat ×</button>
          <button className="lightbox-prev" onClick={() => go(-1)} aria-label="Önceki fotoğraf">←</button>
          <div className="lightbox-image">
            <Image src={gallery[openIndex].src} alt={gallery[openIndex].alt} width={gallery[openIndex].width} height={gallery[openIndex].height} priority sizes="100vw" />
            <p>{String(openIndex + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</p>
          </div>
          <button className="lightbox-next" onClick={() => go(1)} aria-label="Sonraki fotoğraf">→</button>
          {openIndex === gallery.length - 1 && nextCollection && <Link className="lightbox-discover" href={nextCollection.href}>Sonraki koleksiyon · {nextCollection.title} →</Link>}
        </div>
      )}
    </>
  );
}
