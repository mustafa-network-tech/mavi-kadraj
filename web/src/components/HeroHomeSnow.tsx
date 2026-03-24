"use client";

import { useEffect, useRef } from "react";

/**
 * Kar sadece üstte (header + ince kenar): yaz günlerinin üstünde “zaten yağmış” gibi.
 * Hero / yaz mevsimi görselinin üzerine düşen kar yok.
 */
const FLAKE_COUNT = 100;

type Flake = {
  x: number;
  y: number;
  r: number;
  vy: number;
  phase: number;
  drift: number;
  op: number;
};

function drawHeaderFlake(ctx: CanvasRenderingContext2D, f: Flake) {
  const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 2.6);
  g.addColorStop(0, `rgba(255,252,255,${f.op})`);
  g.addColorStop(0.4, `rgba(248,250,255,${f.op * 0.62})`);
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
  ctx.fill();
}

export function HeroHomeSnow({ children }: { children: React.ReactNode }) {
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
    let snowLine = 0;
    let frostBottom = 0;
    let lipBottom = 0;
    let flakeBottom = 0;

    const updateSnowMetrics = () => {
      const zr = zone.getBoundingClientRect();
      const header = zone.querySelector("header");
      snowLine =
        header != null
          ? header.getBoundingClientRect().bottom - zr.top + 4
          : Math.min(100, h * 0.12);
      frostBottom = snowLine + 36;
      lipBottom = snowLine + 44;
      flakeBottom = snowLine + 14;
    };

    const spawnInBand = () => {
      return {
        x: Math.random() * w,
        y: -15 - Math.random() * 55,
        r: 0.65 + Math.random() * 2,
        vy: 8 + Math.random() * 18,
        phase: Math.random() * 6.28,
        drift: 8 + Math.random() * 18,
        op: 0.48 + Math.random() * 0.28,
      } satisfies Flake;
    };

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

      /* canvas boyutu her sıfırlandığında tamamen silinir; ResizeObserver’ın milimetrik tetiklenmesi lokal dev’de yanıp sönmeye yol açabiliyor */
      const sameBuffer =
        flakes.length > 0 && canvas.width === nextCw && canvas.height === nextCh;
      if (!sameBuffer) {
        canvas.width = nextCw;
        canvas.height = nextCh;
        canvas.style.width = `${nextW}px`;
        canvas.style.height = `${nextH}px`;
        ctx.setTransform(nextDpr, 0, 0, nextDpr, 0, 0);

        if (flakes.length === 0) {
          const guessLine = 96;
          for (let i = 0; i < FLAKE_COUNT; i++) {
            flakes.push({
              x: Math.random() * w,
              y: Math.random() * guessLine - 25,
              r: 0.65 + Math.random() * 2,
              vy: 8 + Math.random() * 18,
              phase: Math.random() * 6.28,
              drift: 8 + Math.random() * 18,
              op: 0.48 + Math.random() * 0.28,
            });
          }
        }
      }

      updateSnowMetrics();
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

    let fontsCancel = false;
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!fontsCancel) scheduleResize();
      });
    }

    const tick = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;

      /* getBoundingClientRect her karede layout tetikler; dev’de titreme/jank — metrikler sadece resize’ta */
      ctx.clearRect(0, 0, w, h);

      /* Birikmiş kar: üst bantta hafif buz/beyazlık (zaten yağmış) */
      const frost = ctx.createLinearGradient(0, 0, 0, frostBottom);
      frost.addColorStop(0, "rgba(255,255,255,0.13)");
      frost.addColorStop(0.25, "rgba(248,252,255,0.065)");
      frost.addColorStop(0.65, "rgba(240,248,255,0.028)");
      frost.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = frost;
      ctx.fillRect(0, 0, w, frostBottom);

      /* Yaz görselinin hemen üstü: ince “kar kenarı” — yazın üstüne düşmüyor */
      const lip = ctx.createLinearGradient(0, snowLine, 0, lipBottom);
      lip.addColorStop(0, "rgba(255,255,255,0.085)");
      lip.addColorStop(0.45, "rgba(248,250,255,0.035)");
      lip.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = lip;
      ctx.fillRect(0, snowLine, w, lipBottom - snowLine);

      for (const f of flakes) {
        f.y += f.vy * dt;
        f.x += Math.sin(t * 0.00085 + f.phase) * f.drift * dt * 0.22;

        if (f.y > flakeBottom) {
          Object.assign(f, spawnInBand());
        }

        if (f.y < flakeBottom + 8) {
          drawHeaderFlake(ctx, f);
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      fontsCancel = true;
      cancelAnimationFrame(raf);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      ro.disconnect();
      window.removeEventListener("resize", scheduleResize);
    };
  }, []);

  return (
    <div ref={zoneRef} className="relative overflow-hidden">
      <div className="relative z-[30]">{children}</div>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-[25] h-full w-full [transform:translateZ(0)]"
        aria-hidden
      />
    </div>
  );
}
