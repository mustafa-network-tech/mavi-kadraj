"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDE_MS = 7000;

/** Her sahne: görsel + iç ses + doğal hizalama (merkez değil) */
const SCENES = [
  {
    src: "/hero/hero.jpg",
    slogan: "bazı anlar yaşanmaz… içinden geçilir.",
    placeClass:
      "left-[6%] bottom-[13%] sm:left-[8%] sm:bottom-[16%] max-w-[min(88vw,15.5rem)] text-left",
  },
  {
    src: "/hero/hero1.jpg",
    slogan: "giden dalga değil… kalan izdir.",
    placeClass:
      "right-[6%] bottom-[15%] sm:right-[9%] max-w-[min(86vw,15rem)] text-right",
  },
  {
    src: "/hero/hero2.jpg",
    slogan: "güneş batmaz… sadece gözden çekilir.",
    placeClass:
      "left-[7%] bottom-[27%] sm:bottom-[31%] max-w-[min(84vw,14.5rem)] text-left",
  },
  {
    src: "/hero/hero3.jpg",
    slogan: "deniz konuşmaz… ama susturur.",
    placeClass:
      "right-[7%] bottom-[21%] sm:right-[9%] sm:bottom-[25%] max-w-[min(82vw,14rem)] text-right",
  },
  {
    src: "/hero/hero4.jpg",
    slogan: "yükselen şey balon değil… insanın içidir.",
    placeClass:
      "left-[7%] bottom-[11%] sm:left-[11%] max-w-[min(90vw,16rem)] text-left",
  },
] as const;

/**
 * Slider değil: 7 sn’lik sahne döngüsü — görsel + tek slogan, senkron.
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
