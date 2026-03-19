"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const SOUND_PATH = "/sounds/shutter.mp3";
const FLASH_MS = 320;
/** Sayfa içeriğinin üstünde kalsın (layout / kar / bölüm katmanları) */
const Z_BACKDROP = 9000;
const Z_PANEL = 9100;
const Z_FLASH = 9500;

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
  void a.play().catch(harsh);
}

const NAV_ITEMS = [
  { href: "/", label: "Ana sayfa" },
  { href: "/kadraj-yansimalari", label: "Kadraj yansımaları" },
  { href: "/yasamdan-yansimalar", label: "Yaşamdan Yansımalar" },
  { href: "/kadrajin-otesi", label: "Kadrajın Ötesi" },
] as const;

function measurePanelPosition(
  buttonEl: HTMLButtonElement | null
): { top: number; right: number } | null {
  if (!buttonEl || typeof window === "undefined") return null;
  const r = buttonEl.getBoundingClientRect();
  const vw = document.documentElement.clientWidth;
  return {
    top: r.bottom + 8,
    right: Math.max(12, vw - r.right),
  };
}

/**
 * Mobil: kamera → flaş + küçük açılır menü, header’daki butonun hemen altında (sağa hizalı).
 * Portal `document.body` — HeaderSnow overflow sorunu olmaz.
 */
export function HeaderMobileCameraMenu() {
  const [open, setOpen] = useState(false);
  const [flash, setFlash] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [panelPos, setPanelPos] = useState<{
    top: number;
    right: number;
  } | null>(null);
  const busy = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const reposition = useCallback(() => {
    const pos = measurePanelPosition(buttonRef.current);
    if (pos) setPanelPos(pos);
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      setPanelPos(null);
      return;
    }
    reposition();
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    return () => {
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [open, reposition]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const schedule = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  };

  const toggleMenu = () => {
    if (open) {
      setOpen(false);
      return;
    }
    if (busy.current) return;
    busy.current = true;
    playShutterSound();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      setFlash(true);
      schedule(() => setFlash(false), FLASH_MS);
    }
    schedule(() => {
      const pos =
        measurePanelPosition(buttonRef.current) ?? {
          top: 80,
          right: 16,
        };
      /* Aynı tick’te konum + open: ilk karede panel görünsün */
      setPanelPos(pos);
      setOpen(true);
      busy.current = false;
    }, reduced ? 0 : 140);
  };

  const portal =
    mounted &&
    open &&
    panelPos &&
    typeof document !== "undefined"
      ? createPortal(
          <>
            <button
              type="button"
              aria-label="Menüyü kapat"
              className="fixed inset-0 bg-black/35 md:hidden"
              style={{ zIndex: Z_BACKDROP }}
              onClick={() => setOpen(false)}
            />
            <nav
              className="fixed w-[min(220px,calc(100vw-1.5rem))] rounded-xl border border-white/[0.12] bg-[#121a22]/98 py-1 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-md md:hidden"
              style={{
                zIndex: Z_PANEL,
                top: panelPos.top,
                right: panelPos.right,
                maxHeight: "min(70vh, 320px)",
                overflowY: "auto",
              }}
              role="menu"
              aria-label="Gezinme"
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="block px-3.5 py-2 text-left text-sm tracking-wide text-[#d4dce8] active:bg-white/[0.06]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </>,
          document.body
        )
      : null;

  return (
    <>
      {flash ? (
        <div
          className="mk-flash-explosion pointer-events-none fixed inset-0 bg-white"
          style={{ zIndex: Z_FLASH }}
          aria-hidden
        />
      ) : null}

      {portal}

      <div className="relative z-[40] md:hidden">
        <button
          ref={buttonRef}
          type="button"
          onClick={toggleMenu}
          aria-expanded={open}
          aria-haspopup="true"
          aria-label={open ? "Menüyü kapat — deklanşör" : "Menüyü aç — deklanşör"}
          className="flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-xl border border-white/[0.12] bg-[#0c1218]/40 text-[#c8dff2] backdrop-blur-sm active:scale-[0.97]"
        >
          <CameraIcon className="h-6 w-6" aria-hidden />
        </button>
      </div>
    </>
  );
}

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 8h2l1.5-2h5L14 8h6a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="14" r="3.25" />
      <path d="M8.5 6V5a1 1 0 0 1 1-1h1" />
    </svg>
  );
}
