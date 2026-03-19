"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/** public/hero/ klasörü — 3,5 sn’de bir sırayla değişir */
const HERO_IMAGES = [
  "/hero/hero.jpg",
  "/hero/hero1.jpg",
  "/hero/hero2.jpg",
  "/hero/hero3.jpg",
  "/hero/hero4.jpg",
] as const;

const INTERVAL_MS = 4500;

export function HeroBackgroundSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0">
      {HERO_IMAGES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          className={`object-cover object-center transition-opacity duration-700 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          sizes="100vw"
          priority={i === 0}
          aria-hidden
        />
      ))}
    </div>
  );
}
