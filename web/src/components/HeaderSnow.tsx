"use client";

import { useEffect, useRef } from "react";

/**
 * Kar animasyonu sadece header alanında — tüm sayfalarda header üzerinde düşer.
 */
const FLAKE_COUNT = 80;

type Flake = {
  x: number;
  y: number;
  r: number;
  vy: number;
  phase: number;
  drift: number;
  op: number;
};

function drawFlake(ctx: CanvasRenderingContext2D, f: Flake) {
  const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 2.6);
  g.addColorStop(0, `rgba(255,252,255,${f.op})`);
  g.addColorStop(0.4, `rgba(248,250,255,${f.op * 0.62})`);
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
  ctx.fill();
}

export function HeaderSnow({ children }: { children: React.ReactNode }) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const zone = zoneRef.current;
    const canvas = canvasRef.current;
    if (!zone || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let flakes: Flake[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let last = performance.now();

    const spawn = () =>
      ({
        x: Math.random() * w,
        y: -15 - Math.random() * 55,
        r: 0.65 + Math.random() * 2,
        vy: 8 + Math.random() * 18,
        phase: Math.random() * 6.28,
        drift: 8 + Math.random() * 18,
        op: 0.48 + Math.random() * 0.28,
      }) satisfies Flake;

    const resize = () => {
      const r = zone.getBoundingClientRect();
      const nextW = Math.max(1, Math.round(r.width));
      const nextH = Math.max(1, Math.round(r.height));
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
      const nextCw = Math.floor(nextW * nextDpr);
      const nextCh = Math.floor(nextH * nextDpr);

      w = nextW;
      h = nextH;
      dpr = nextDpr;

      const sameBuffer =
        flakes.length > 0 && canvas.width === nextCw && canvas.height === nextCh;
      if (sameBuffer) return;

      canvas.width = nextCw;
      canvas.height = nextCh;
      canvas.style.width = `${nextW}px`;
      canvas.style.height = `${nextH}px`;
      ctx.setTransform(nextDpr, 0, 0, nextDpr, 0, 0);

      if (flakes.length === 0) {
        const guessLine = Math.min(96, h);
        for (let i = 0; i < FLAKE_COUNT; i++) {
          flakes.push({
            ...spawn(),
            y: Math.random() * guessLine - 25,
          });
        }
      }
    };

    let resizeRaf = 0;
    const scheduleResize = () => {
      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = 0;
        resize();
      });
    };

    resize();
    const ro = new ResizeObserver(() => scheduleResize());
    ro.observe(zone);
    window.addEventListener("resize", scheduleResize);

    const tick = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;

      ctx.clearRect(0, 0, w, h);

      for (const f of flakes) {
        f.y += f.vy * dt;
        f.x += Math.sin(t * 0.00085 + f.phase) * f.drift * dt * 0.22;

        if (f.y > h + 10) {
          Object.assign(f, spawn());
        }

        if (f.y > -5 && f.y < h + 5) {
          drawFlake(ctx, f);
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      ro.disconnect();
      window.removeEventListener("resize", scheduleResize);
    };
  }, []);

  return (
    <div ref={zoneRef} className="relative overflow-hidden">
      {/* Kar canvas’ının altında kalmaması için (mobil menü, tıklanabilir alanlar) */}
      <div className="relative z-[30]">{children}</div>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-[25] h-full w-full"
        aria-hidden
      />
    </div>
  );
}
