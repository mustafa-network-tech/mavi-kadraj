"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const SOUND_PATH = "/sounds/shutter.mp3";
/** Tıklamadan sonra sayfaya geçiş: 0.6 sn */
const NAV_MS = 600;
/** Deklanşör ile aynı anda: hafif beyazlık (saniye) */
const SUBTLE_FLASH_MS = 100;

function playHarshShutterSynth() {
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AC) return;
  const ctx = new AC();
  if (ctx.state === "suspended") void ctx.resume();
  const t = ctx.currentTime;

  const len = Math.floor(ctx.sampleRate * 0.085);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.1));
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buf;
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 5200;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.52, t);
  g.gain.exponentialRampToValueAtTime(0.003, t + 0.09);
  noise.connect(hp);
  hp.connect(g);
  g.connect(ctx.destination);
  noise.start(t);

  const o1 = ctx.createOscillator();
  o1.type = "square";
  o1.frequency.setValueAtTime(5200, t);
  o1.frequency.exponentialRampToValueAtTime(280, t + 0.018);
  const g1 = ctx.createGain();
  g1.gain.setValueAtTime(0.16, t);
  g1.gain.exponentialRampToValueAtTime(0.001, t + 0.035);
  o1.connect(g1);
  g1.connect(ctx.destination);
  o1.start(t);
  o1.stop(t + 0.04);
}

function playShutterSound() {
  const harsh = () => {
    try {
      playHarshShutterSynth();
    } catch {
      /* ignore */
    }
  };
  const a = new Audio(SOUND_PATH);
  a.volume = 1;
  a.playbackRate = 1;
  void a.play().catch(harsh);
}

export function KadrajFlashNavButton() {
  const router = useRouter();
  const busy = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [subtleFlash, setSubtleFlash] = useState(false);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  const go = useCallback(() => {
    if (busy.current) return;
    busy.current = true;
    setLocked(true);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    playShutterSound();

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timers.current.push(id);
    };

    if (!reduced) {
      setSubtleFlash(true);
      schedule(() => setSubtleFlash(false), SUBTLE_FLASH_MS);
    }

    schedule(() => router.push("/kadraj-yansimalari"), NAV_MS);
  }, [router]);

  return (
    <>
      {subtleFlash ? (
        <div
          className="mk-flash-subtle pointer-events-none fixed inset-0 z-[500] bg-white"
          aria-hidden
        />
      ) : null}

      <button
        type="button"
        onClick={go}
        disabled={locked}
        className="inline-block rounded-lg border-0 bg-white/[0.055] px-8 py-3.5 text-xs font-medium uppercase tracking-[0.14em] text-[#e6ecf4] antialiased shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-md backdrop-saturate-150 transition-[background-color,color,box-shadow] duration-300 hover:bg-white/[0.09] hover:text-[#f0f4fa] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] disabled:pointer-events-none disabled:opacity-60"
      >
        kadraj yansımaları…
      </button>
    </>
  );
}
