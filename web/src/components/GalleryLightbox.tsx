"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export function GalleryLightbox({ gallery }: { gallery: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const goPrev = useCallback(() => {
    if (openIndex === null) return;
    setOpenIndex((openIndex - 1 + gallery.length) % gallery.length);
  }, [openIndex, gallery.length]);

  const goNext = useCallback(() => {
    if (openIndex === null) return;
    setOpenIndex((openIndex + 1) % gallery.length);
  }, [openIndex, gallery.length]);

  const close = useCallback(() => setOpenIndex(null), []);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, close, goPrev, goNext]);

  if (!gallery.length) return null;

  return (
    <>
      <ul className="mt-12 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-10 sm:gap-y-12 md:gap-x-12 md:gap-y-14">
        {gallery.map((img, i) => (
          <li key={`${i}-${img.src}`} className="group flex flex-col">
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="w-full cursor-pointer rounded-2xl bg-[var(--mk-bg-soft)] shadow-[0_16px_56px_rgba(0,0,0,0.5)] ring-1 ring-white/[0.14] transition duration-500 ease-out hover:scale-[1.03] hover:shadow-[0_20px_64px_rgba(91,143,199,0.22)] hover:ring-[var(--mk-accent)]/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mk-accent)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:aspect-[3/2]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover brightness-[0.98] transition duration-500 group-hover:brightness-100"
                  sizes="(max-width: 640px) 50vw, 45vw"
                />
              </div>
            </button>
            <p className="mt-4 min-h-[2.5rem] text-center font-serif text-sm leading-relaxed text-[#c8d4e4] md:mt-5 md:text-base">
              {img.caption ?? ""}
            </p>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0c1838]/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Fotoğraf galerisi"
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-[102] flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition duration-200 hover:bg-white/20 hover:text-white hover:brightness-125 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mk-accent)]"
            aria-label="Kapat"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 z-[102] flex h-12 w-12 items-center justify-center rounded-full text-white/80 transition duration-200 hover:bg-white/20 hover:text-white hover:brightness-125 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] md:left-4 md:h-14 md:w-14 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mk-accent)]"
            aria-label="Önceki fotoğraf"
          >
            <svg className="h-8 w-8 md:h-9 md:w-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative mx-14 max-h-[85vh] max-w-[calc(100vw-7rem)] md:mx-20 md:max-w-[calc(100vw-10rem)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={gallery[openIndex].src}
              alt={gallery[openIndex].alt}
              className="max-h-[85vh] w-auto object-contain"
            />
            {gallery[openIndex].caption ? (
              <p className="mt-3 text-center font-serif text-sm text-white/90 md:text-base">
                {gallery[openIndex].caption}
              </p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 z-[102] flex h-12 w-12 items-center justify-center rounded-full text-white/80 transition duration-200 hover:bg-white/20 hover:text-white hover:brightness-125 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] md:right-4 md:h-14 md:w-14 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mk-accent)]"
            aria-label="Sonraki fotoğraf"
          >
            <svg className="h-8 w-8 md:h-9 md:w-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
