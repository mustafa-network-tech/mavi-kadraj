"use client";

import { useEffect, useRef, useState } from "react";
import { KadrajFlashNavButton } from "@/components/KadrajFlashNavButton";
import { SiteFooter } from "@/components/SiteFooter";
import {
  WaveBandBackground,
  waveFooterBandColor,
} from "@/components/WaveBandBackground";

/** Yukarıdan aşağı: yazı rengi kademeli koyulaşır (arka plan değil) */
const TITLE_COLOR = "rgba(236,240,248,0.92)";
const PARA_COLORS = [
  "rgba(232,236,245,0.88)",
  "rgba(210,218,232,0.82)",
  "rgba(188,198,218,0.76)",
  "rgba(165,178,202,0.7)",
] as const;

const MANIFESTO_BLOCKS: [string, string][] = [
  [
    "Mavi Kadraj, sessiz karelerin peşine düşen bir bakıştır.",
    "Görüntünün kendisinden çok, içinde bıraktığı hissi arar.",
  ],
  [
    "Burada doğa yalnızca bir manzara değildir.",
    "Işık, gölge, rüzgâr ve bekleyiş; her biri kendi hikâyesini taşır.",
  ],
  [
    "Her fotoğraf, acele etmeden bakan bir gözün değil,",
    "hissetmeyi unutmayan bir yüreğin izidir.",
  ],
  [
    "Mavi Kadraj, hızlıca bakıp geçenler için değil;",
    "bir anın içinde durmayı bilenler içindir.",
  ],
];

const textBodyBase = {
  fontFamily: 'var(--font-cormorant), "Libre Baskerville", "Georgia", serif',
  fontSize: "clamp(23px, 2.05vw, 34px)",
  lineHeight: 1.82,
  fontWeight: 400 as const,
  letterSpacing: "0.01em",
  textRendering: "optimizeLegibility" as const,
};

export function HomeBelowHeroLayers() {
  const manifestoRef = useRef<HTMLDivElement>(null);
  const [manifestoVisible, setManifestoVisible] = useState(false);

  useEffect(() => {
    const el = manifestoRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setManifestoVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setManifestoVisible(true);
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="relative flex w-full min-h-0 flex-1 flex-col md:min-h-[72vh]"
      aria-label="İçerik"
    >
      <WaveBandBackground />

      <div className="relative z-[2] flex w-full flex-col">
        <div
          ref={manifestoRef}
          className="mx-auto w-full max-w-[780px] px-5 sm:px-8 md:px-10"
          style={{
            paddingTop: 100,
            paddingBottom: 100,
            opacity: manifestoVisible ? 1 : 0,
            transform: manifestoVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.2s ease, transform 1.2s ease",
            textShadow: "0 1px 24px rgba(8,12,18,0.35)",
          }}
        >
          <h2
            className="mb-8 text-center font-sans uppercase antialiased md:mb-10"
            style={{
              fontSize: "clamp(12px, 1.1vw, 14px)",
              letterSpacing: "0.22em",
              fontWeight: 500,
              color: TITLE_COLOR,
            }}
          >
            <span className="whitespace-normal sm:whitespace-nowrap">
              MAVİ KADRAJ NASIL BİR{" "}
            </span>
            <span className="group relative inline-block cursor-default pb-1 align-baseline">
              <span className="inline-block">BAKIŞTIR?</span>
              <span
                className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-white/55 transition-transform duration-[500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-x-100"
                aria-hidden
              />
            </span>
          </h2>
          <div className="mx-auto text-center antialiased">
            {MANIFESTO_BLOCKS.map(([a, b], i) => {
              const paraColor =
                PARA_COLORS[i] ?? PARA_COLORS[PARA_COLORS.length - 1];
              const isLast = i === MANIFESTO_BLOCKS.length - 1;
              return (
                <p
                  key={i}
                  className={i < MANIFESTO_BLOCKS.length - 1 ? "mb-7 md:mb-9" : ""}
                  style={{
                    ...textBodyBase,
                    color: paraColor,
                  }}
                >
                  {a}
                  <br />
                  {isLast ? (
                    <>
                      bir anın içinde{" "}
                      <span className="group/dur relative inline cursor-default pb-0.5 align-baseline">
                        <span className="inline-block origin-[50%_85%] transition-transform duration-300 ease-out will-change-transform group-hover/dur:scale-[1.09]">
                          durmayı
                        </span>
                        <span
                          className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-white/48 transition-transform duration-[520ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover/dur:scale-x-100"
                          aria-hidden
                        />
                      </span>{" "}
                      bilenler içindir.
                    </>
                  ) : (
                    b
                  )}
                </p>
              );
            })}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-3xl justify-center px-5 pb-14 sm:px-8 md:px-10 md:pb-16">
          <KadrajFlashNavButton />
        </div>
      </div>

      <div
        className="relative z-[2] mt-auto w-full pb-4 pt-1"
        style={{ backgroundColor: waveFooterBandColor }}
      >
        <SiteFooter />
      </div>
    </section>
  );
}
