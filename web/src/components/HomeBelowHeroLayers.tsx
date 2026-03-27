"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { KadrajFlashNavButton } from "@/components/KadrajFlashNavButton";
import { SiteFooter } from "@/components/SiteFooter";
import {
  WaveBandBackground,
  waveFooterBandColor,
} from "@/components/WaveBandBackground";

/** Küçük üst başlık */
const TITLE_STYLE: CSSProperties = {
  fontSize: "clamp(10px, 0.95vw, 12px)",
  letterSpacing: "0.12em",
  fontWeight: 500,
  color: "rgba(200, 214, 232, 0.72)",
};

/** Metin sütunu genişlikleri (dar ↔ geniş ritim) */
const MEASURE_MAX = {
  narrow: "min(460px, 88vw)", // ~400–500 bandı
  medium: "min(560px, 91vw)",
  wide: "min(680px, 93vw)", // ~600–700 bandı
} as const;

type Measure = keyof typeof MEASURE_MAX;
type Lane = "left" | "right";

type Segment = {
  text: string;
  i?: boolean;
  light?: boolean;
  dim?: boolean;
  whisper?: boolean;
  hoverLift?: boolean;
};

type VerseScale = "whisper" | "soft" | "body" | "lift" | "pulse" | "anthem";

type VerseBlock = {
  kind: "verse";
  /** Zigzag: sol / sağ şerit */
  lane: Lane;
  measure: Measure;
  scale: VerseScale;
  fade?: number;
  lines: Segment[][];
};

type BreathBlock = {
  kind: "breath";
  emoji?: string;
  gap: "sm" | "md" | "lg";
};

type ManifestBlock = VerseBlock | BreathBlock;

const SCALE_STYLES: Record<
  VerseScale,
  Pick<CSSProperties, "fontSize" | "lineHeight" | "fontWeight" | "letterSpacing">
> = {
  whisper: {
    fontSize: "clamp(14px, 1.35vw, 17px)",
    lineHeight: 1.65,
    fontWeight: 300,
    letterSpacing: "0.04em",
  },
  soft: {
    fontSize: "clamp(16px, 1.55vw, 20px)",
    lineHeight: 1.72,
    fontWeight: 400,
    letterSpacing: "0.025em",
  },
  body: {
    fontSize: "clamp(17px, 1.72vw, 22px)",
    lineHeight: 1.78,
    fontWeight: 400,
    letterSpacing: "0.02em",
  },
  lift: {
    fontSize: "clamp(19px, 1.95vw, 25px)",
    lineHeight: 1.52,
    fontWeight: 450,
    letterSpacing: "0.015em",
  },
  pulse: {
    fontSize: "clamp(22px, 2.35vw, 30px)",
    lineHeight: 1.38,
    fontWeight: 500,
    letterSpacing: "0.01em",
  },
  anthem: {
    fontSize: "clamp(26px, 3.1vw, 38px)",
    lineHeight: 1.22,
    fontWeight: 600,
    letterSpacing: "-0.01em",
  },
};

const BASE_TEXT =
  'var(--font-cormorant), "Libre Baskerville", "Georgia", serif' as const;

/** İnce grain — daha yumuşak (düşük octaves, sık olmayan frekans) */
const MANIFESTO_GRAIN_FINE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)'/%3E%3C/svg%3E\")";

/** İri taneli ama yumuşak “nokta” — keskinlik yok */
const MANIFESTO_GRAIN_COARSE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='c'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.42' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23c)'/%3E%3C/svg%3E\")";

/** Önceki grain görünürlüğü × ~0.7 (%30 azaltma) */
const GRAIN_COARSE_OPACITY = 0.14 * 0.7;
const GRAIN_FINE_OPACITY = 0.11 * 0.7;

const MANIFESTO: ManifestBlock[] = [
  {
    kind: "verse",
    lane: "left",
    measure: "wide",
    scale: "anthem",
    lines: [
      [
        { text: "Mavi Kadraj, ", light: true },
        { text: "sessiz karelerin peşine düşen bir bakıştır.", i: true },
      ],
    ],
  },
  { kind: "breath", gap: "md", emoji: "🍃" },
  {
    kind: "verse",
    lane: "right",
    measure: "medium",
    scale: "body",
    lines: [
      [
        { text: "Görüntünün kendisinden çok, ", dim: true },
        { text: "içinde bıraktığı hissi", i: true, light: true },
        { text: " arar.", dim: true },
      ],
    ],
  },
  { kind: "breath", gap: "lg" },
  {
    kind: "verse",
    lane: "left",
    measure: "narrow",
    scale: "lift",
    lines: [
      [{ text: "Burada doğa yalnızca bir manzara değildir.", light: true }],
    ],
  },
  {
    kind: "verse",
    lane: "right",
    measure: "narrow",
    scale: "whisper",
    fade: 0.92,
    lines: [
      [
        { text: "Işık, gölge, rüzgâr ve bekleyiş;", whisper: true },
        { text: " her biri kendi hikâyesini taşır.", dim: true },
      ],
    ],
  },
  { kind: "breath", gap: "md", emoji: "🍃" },
  {
    kind: "verse",
    lane: "left",
    measure: "wide",
    scale: "pulse",
    lines: [
      [
        { text: "Her fotoğraf", light: true },
        { text: ", acele etmeden bakan bir gözün değil;", dim: true },
      ],
    ],
  },
  {
    kind: "verse",
    lane: "right",
    measure: "narrow",
    scale: "soft",
    lines: [
      [
        { text: "hissetmeyi unutmayan ", dim: true },
        { text: "bir yüreğin", i: true, light: true },
        { text: " izidir.", dim: true },
      ],
    ],
  },
  { kind: "breath", gap: "lg" },
  {
    kind: "verse",
    lane: "left",
    measure: "medium",
    scale: "soft",
    fade: 0.9,
    lines: [
      [
        {
          text: "Mavi Kadraj, hızlıca bakıp geçenler için değil;",
          dim: true,
        },
      ],
    ],
  },
  {
    kind: "verse",
    lane: "right",
    measure: "narrow",
    scale: "lift",
    lines: [
      [
        { text: "bir anın içinde ", dim: true },
        { text: "durmayı", i: true, light: true, hoverLift: true },
        { text: " bilenler içindir.", dim: true },
      ],
    ],
  },
];

function segmentColor(seg: Segment): string {
  if (seg.whisper) return "rgba(178, 196, 218, 0.55)";
  if (seg.dim) return "rgba(188, 200, 220, 0.62)";
  if (seg.light) return "rgba(244, 248, 255, 0.95)";
  return "rgba(228, 234, 244, 0.88)";
}

function renderSegments(parts: Segment[]): ReactNode {
  return parts.map((seg, j) => {
    const style: CSSProperties = {
      fontStyle: seg.i ? "italic" : undefined,
      color: segmentColor(seg),
      fontWeight: seg.light ? 500 : undefined,
    };

    if (seg.hoverLift) {
      return (
        <span
          key={j}
          className="group/dur relative inline cursor-default pb-0.5 align-baseline"
          style={style}
        >
          <span className="inline-block origin-[50%_85%] transition-transform duration-300 ease-out will-change-transform group-hover/dur:scale-[1.08]">
            {seg.text}
          </span>
          <span
            className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-white/45 transition-transform duration-[520ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover/dur:scale-x-100"
            aria-hidden
          />
        </span>
      );
    }

    return (
      <span key={j} style={style}>
        {seg.text}
      </span>
    );
  });
}

function breathGapClass(gap: BreathBlock["gap"]): string {
  if (gap === "sm") return "h-6 sm:h-8";
  if (gap === "md") return "h-10 sm:h-12";
  return "h-14 sm:h-16";
}

function verseLaneClass(lane: Lane): string {
  /* flex-col + self-start / self-end → zigzag (stretch kapalı) */
  if (lane === "left") {
    return "self-start text-left md:pr-5 lg:pr-8";
  }
  return "self-end text-left md:pl-6 lg:pl-10";
}

export function HomeBelowHeroLayers() {
  const manifestoRef = useRef<HTMLDivElement>(null);
  const [manifestoVisible, setManifestoVisible] = useState(false);

  useEffect(() => {
    const el = manifestoRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setManifestoVisible(true));
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
      className="relative flex w-full min-h-0 flex-1 flex-col"
      aria-label="İçerik"
    >
      <div className="relative flex min-h-0 flex-1 flex-col md:min-h-[72vh]">
        <WaveBandBackground />

        {/* Dalga üstü: yumuşak yıkama + sis + hafif blur + daha silik grain */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              background: [
                "linear-gradient(180deg, rgba(12, 18, 24, 0.2) 0%, rgba(12, 18, 24, 0) 28%, rgba(8, 12, 18, 0.03) 55%, rgba(12, 18, 24, 0.16) 100%)",
                "radial-gradient(ellipse 90% 48% at 50% -8%, rgba(91, 143, 199, 0.06), transparent 58%)",
              ].join(", "),
            }}
          />
          {/* Hafif sis — geniş, yumuşak bulutlar */}
          <div
            className="absolute inset-0"
            style={{
              background: [
                "radial-gradient(ellipse 110% 75% at 18% 22%, rgba(200, 220, 238, 0.09), transparent 58%)",
                "radial-gradient(ellipse 95% 70% at 92% 38%, rgba(165, 195, 220, 0.06), transparent 52%)",
                "radial-gradient(ellipse 100% 55% at 48% 92%, rgba(120, 150, 185, 0.07), transparent 48%)",
                "radial-gradient(ellipse 70% 45% at 72% 72%, rgba(140, 175, 210, 0.05), transparent 50%)",
              ].join(", "),
            }}
          />
          {/* Dalga şeritlerini yumuşatan hafif buğu / blur */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "rgba(14, 19, 26, 0.06)",
              backdropFilter: "blur(18px) saturate(1.05)",
              WebkitBackdropFilter: "blur(18px) saturate(1.05)",
            }}
          />
          {/* Grain — daha düşük opaklık, ikisi de yumuşak blend */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: MANIFESTO_GRAIN_COARSE,
              backgroundRepeat: "repeat",
              backgroundSize: "260px 260px",
              opacity: GRAIN_COARSE_OPACITY,
              mixBlendMode: "soft-light",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: MANIFESTO_GRAIN_FINE,
              backgroundRepeat: "repeat",
              backgroundSize: "160px 160px",
              opacity: GRAIN_FINE_OPACITY,
              mixBlendMode: "soft-light",
            }}
          />
        </div>

        <div className="relative z-[2] flex w-full flex-1 flex-col">
        <div
          ref={manifestoRef}
          className="mx-auto w-full max-w-[min(760px,94vw)] px-5 sm:px-8 md:px-10"
          style={{
            paddingTop: "clamp(4.5rem, 10vw, 6.25rem)",
            paddingBottom: "clamp(4.5rem, 10vw, 6.25rem)",
            opacity: manifestoVisible ? 1 : 0,
            transform: manifestoVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.2s ease, transform 1.2s ease",
            textShadow: "0 1px 20px rgba(8,12,18,0.28)",
          }}
        >
          <h2
            className="mb-10 text-center font-sans font-normal antialiased sm:mb-12 md:mb-14"
            style={TITLE_STYLE}
          >
            <span className="whitespace-normal sm:whitespace-nowrap">
              Mavi Kadraj nasıl bir{" "}
            </span>
            <span className="group relative inline-block cursor-default pb-0.5 align-baseline">
              <span className="inline-block">bakıştır?</span>
              <span
                className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-white/40 transition-transform duration-[500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-x-100"
                aria-hidden
              />
            </span>
          </h2>

          <div
            className="flex w-full flex-col antialiased"
            style={{ fontFamily: BASE_TEXT, textRendering: "optimizeLegibility" }}
          >
            {MANIFESTO.map((block, i) => {
              if (block.kind === "breath") {
                return (
                  <div
                    key={`b-${i}`}
                    className={`flex w-full flex-col items-center justify-center ${breathGapClass(block.gap)}`}
                    aria-hidden
                  >
                    {block.emoji ? (
                      <span
                        className="select-none text-2xl leading-none opacity-[0.45] sm:text-3xl"
                        style={{ filter: "grayscale(0.15)" }}
                      >
                        {block.emoji}
                      </span>
                    ) : null}
                  </div>
                );
              }

              const scale = SCALE_STYLES[block.scale];
              const fade = block.fade ?? 1;
              const maxWidth = MEASURE_MAX[block.measure];
              const laneClass = verseLaneClass(block.lane);

              return (
                <div
                  key={`v-${i}`}
                  className={laneClass}
                  style={{
                    maxWidth,
                    ...scale,
                    opacity: fade,
                    marginBottom:
                      i < MANIFESTO.length - 1 &&
                      MANIFESTO[i + 1]?.kind === "verse"
                        ? "0.35em"
                        : undefined,
                  }}
                >
                  {block.lines.map((line, li) => (
                    <p
                      key={li}
                      className={li > 0 ? "mt-2 sm:mt-2.5" : undefined}
                      style={{ margin: 0 }}
                    >
                      {renderSegments(line)}
                    </p>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[min(760px,94vw)] justify-center px-5 pb-14 sm:px-8 md:px-10 md:pb-16">
          <KadrajFlashNavButton />
        </div>
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
