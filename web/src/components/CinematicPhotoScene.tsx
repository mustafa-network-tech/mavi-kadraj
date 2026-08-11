"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { CollectionImage } from "@/lib/collections";

export function CinematicPhotoScene({ wide, portrait }: { wide: CollectionImage; portrait: CollectionImage }) {
  const scene = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = scene.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const span = window.innerHeight + rect.height;
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / span));
      node.style.setProperty("--scene-progress", progress.toFixed(3));
      node.style.setProperty("--wide-progress", Math.min(1, Math.max(0, (progress - .08) / .34)).toFixed(3));
      node.style.setProperty("--portrait-progress", Math.min(1, Math.max(0, (progress - .25) / .34)).toFixed(3));
      node.style.setProperty("--copy-progress", Math.min(1, Math.max(0, (progress - .43) / .22)).toFixed(3));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  return <section ref={scene} id="photo-motion" className="cinematic-scene" aria-label="Hareketli fotoğraf sahnesi">
    <p className="cinematic-scene__whisper">biraz daha yaklaş…</p><span className="cinematic-scene__symbol" aria-hidden>✨</span>
    <figure className="cinematic-scene__wide"><Image src={wide.src} alt={wide.alt} fill sizes="(max-width:700px) 94vw, 78vw" className="object-cover" /></figure>
    <figure className="cinematic-scene__portrait"><Image src={portrait.src} alt={portrait.alt} fill sizes="(max-width:700px) 58vw, 28vw" className="object-cover" /></figure>
    <blockquote>Bazı kareler<br /><em>bizi bekler.</em></blockquote>
  </section>;
}
