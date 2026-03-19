"use client";

import { useEffect, useState } from "react";

const LEFT_LINES = [
  "sessiz kareler...",
  "zamana dokunan anlar",
  "konuşmadan anlatan sahneler",
  "göğe bırakılmış bakışlar",
  "biriken ışığın dili",
] as const;

const RIGHT_LINES = [
  "iz bırakan sessizlik...",
  "görülen değil hissedilen",
  "ışıkla yazılmış hatıralar",
  "anın içinden geçen gölge",
  "kadrajda kalan hisler",
] as const;

const FADE_MS = 1200;
const STAGGER_MS = 500;
const PAUSE_MIN = 8000;
const PAUSE_MAX = 10000;

function nextPause() {
  return PAUSE_MIN + Math.random() * (PAUSE_MAX - PAUSE_MIN);
}

type Anim = "rest" | "leaving" | "entering";

function BreathingSpan({
  text,
  anim,
  className,
}: {
  text: string;
  anim: Anim;
  className: string;
}) {
  const [enterOn, setEnterOn] = useState(false);

  useEffect(() => {
    if (anim !== "entering") {
      setEnterOn(false);
      return;
    }
    setEnterOn(false);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEnterOn(true));
    });
    return () => cancelAnimationFrame(id);
  }, [anim, text]);

  const ease = "opacity 1.2s ease, transform 1.2s ease, filter 1.2s ease";

  let opacity: number;
  let transform: string;
  let transition: string;

  if (anim === "rest") {
    opacity = 0.88;
    transform = "translateY(0)";
    transition = ease;
  } else if (anim === "leaving") {
    opacity = 0;
    transform = "translateY(10px)";
    transition = ease;
  } else if (!enterOn) {
    opacity = 0;
    transform = "translateY(-8px)";
    transition = "none";
  } else {
    opacity = 0.88;
    transform = "translateY(0)";
    transition = ease;
  }

  return (
    <span
      className={`inline-block will-change-[opacity,transform] bg-clip-text text-transparent ${className}`}
      style={{ opacity, transform, transition }}
    >
      {text}
    </span>
  );
}

export function HeroRotatingTaglines() {
  const [leftIdx, setLeftIdx] = useState(0);
  const [leftAnim, setLeftAnim] = useState<Anim>("rest");
  const [rightIdx, setRightIdx] = useState(0);
  const [rightAnim, setRightAnim] = useState<Anim>("rest");

  useEffect(() => {
    let alive = true;
    const sleep = (ms: number) =>
      new Promise<void>((r) => setTimeout(r, ms));
    const raf2 = () =>
      new Promise<void>((r) =>
        requestAnimationFrame(() => requestAnimationFrame(() => r())),
      );

    const cycle = async (
      setIdx: React.Dispatch<React.SetStateAction<number>>,
      setA: React.Dispatch<React.SetStateAction<Anim>>,
      len: number,
    ) => {
      setA("leaving");
      await sleep(FADE_MS);
      if (!alive) return;
      setIdx((i) => (i + 1) % len);
      setA("entering");
      await raf2();
      if (!alive) return;
      await sleep(FADE_MS);
      if (!alive) return;
      setA("rest");
    };

    (async () => {
      while (alive) {
        await sleep(nextPause());
        if (!alive) break;
        await cycle(setLeftIdx, setLeftAnim, LEFT_LINES.length);
        if (!alive) break;
        await sleep(STAGGER_MS);
        if (!alive) break;
        await cycle(setRightIdx, setRightAnim, RIGHT_LINES.length);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  /* Solda: beyaz → açık mavi (okuma yönü); sağda: aynı his, satır sağında beyaz */
  const leftGradient =
    "bg-gradient-to-r from-[#ffffff] via-[#b9d6ee] to-[#5b9ecf] hover:from-white hover:via-[#cae4f8] hover:to-[#6eb0e0]";
  const rightGradient =
    "bg-gradient-to-l from-[#4f94c8] via-[#aad4f0] to-[#ffffff] hover:from-[#5fa0d4] hover:via-[#c0e0fa] hover:to-white";

  return (
    <div className="mt-auto flex flex-col gap-5 px-5 pb-7 pt-2 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:px-8 sm:pb-8 md:px-12 md:pb-10">
      <p
        className="group max-w-[min(100%,26rem)] cursor-default text-left font-serif italic leading-relaxed tracking-wide [font-size:clamp(15px,1.2vw,22px)] transition-[opacity,transform,filter] duration-[1200ms] ease-in-out [filter:drop-shadow(0_1px_10px_rgba(180,210,240,0.2))]"
      >
        <BreathingSpan
          text={LEFT_LINES[leftIdx]}
          anim={leftAnim}
          className={`${leftGradient} group-hover:brightness-110`}
        />
      </p>
      <p className="group max-w-[min(100%,28rem)] cursor-default self-end text-right font-serif font-normal leading-relaxed tracking-[0.14em] [font-size:clamp(15px,1.2vw,22px)] transition-[opacity,transform,filter] duration-[1200ms] ease-in-out sm:self-auto sm:tracking-[0.18em] [filter:drop-shadow(0_1px_10px_rgba(160,200,235,0.22))]">
        <BreathingSpan
          text={RIGHT_LINES[rightIdx]}
          anim={rightAnim}
          className={`${rightGradient} group-hover:brightness-110`}
        />
      </p>
    </div>
  );
}
