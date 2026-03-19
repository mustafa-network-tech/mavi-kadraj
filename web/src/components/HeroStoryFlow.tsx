"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDE_MS = 8000;

/** Her sahne: görsel + iç ses + doğal hizalama (merkez değil) */
const SCENES = [
  {
    src: "/hero/hero.jpg",
    slogan: "bazı anlar yaşanmaz… içinden geçilir.",
    placeClass:
      "left-1/2 bottom-[15%] sm:bottom-[17%] -translate-x-1/2 text-center max-w-[min(92vw,22rem)]",
  },
  {
    src: "/hero/hero1.jpg",
    slogan: "giden dalga değil… kalan izdir.",
    placeClass:
      "left-1/2 bottom-[15%] sm:bottom-[17%] -translate-x-1/2 text-center max-w-[min(92vw,22rem)]",
  },
  {
    src: "/hero/hero2.jpg",
    slogan: "güneş batmaz… sadece gözden çekilir.",
    placeClass:
      "left-1/2 bottom-[15%] sm:bottom-[17%] -translate-x-1/2 text-center max-w-[min(92vw,22rem)]",
  },
  {
    src: "/hero/hero3.jpg",
    slogan: "deniz konuşmaz… ama susturur.",
    placeClass:
      "left-1/2 bottom-[15%] sm:bottom-[17%] -translate-x-1/2 text-center max-w-[min(92vw,22rem)]",
  },
  {
    src: "/hero/hero4.jpg",
    slogan: "yükselen şey balon değil… insanın içidir.",
    placeClass:
      "left-1/2 bottom-[15%] sm:bottom-[17%] -translate-x-1/2 text-center max-w-[min(92vw,22rem)]",
  },
] as const;

/**
 * Slider değil: 8 sn’lik sahne döngüsü — görsel + tek slogan, senkron.
 */
export function HeroStoryFlow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SCENES.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  const scene = SCENES[index];

  return (
    <>
      <div className="absolute inset-0">
        {SCENES.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt=""
            fill
            sizes="100vw"
            priority={i === 0}
            className={`absolute inset-0 object-cover object-center transition-opacity duration-[1800ms] ease-in-out ${
              i === index ? "z-[2] opacity-100" : "z-[1] opacity-0"
            }`}
            aria-hidden
          />
        ))}
      </div>

      {/* Tek slogan; fotoğrafın içinden doğuyormuş gibi — üstte bağırmayan ton */}
      <div
        key={`slogan-${index}`}
        className={`mk-hero-slogan pointer-events-none absolute z-[16] ${scene.placeClass}`}
      >
        <p
          className="font-sans font-light leading-[1.65] sm:leading-[1.7]"
          style={{
            color: "#eaeaea",
            fontSize: "clamp(0.8125rem, 2.1vw, 1.0625rem)",
            letterSpacing: "0.07em",
            textShadow:
              "0 1px 18px rgba(0,0,0,0.35), 0 0 1px rgba(0,0,0,0.2)",
          }}
        >
          {scene.slogan}
        </p>
      </div>
    </>
  );
}
