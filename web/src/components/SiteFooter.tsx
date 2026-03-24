import type { CSSProperties } from "react";

/**
 * Ortalı slogan / çizgi / ©; sağ altta MK DIGITAL SYSTEMS.
 */
export function SiteFooter({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <footer
      className={`relative w-full overflow-x-clip overflow-y-visible px-6 pb-28 pt-10 sm:pb-[4.5rem] ${className}`}
      style={style}
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center pb-8 text-center">
        <p
          className="mb-10"
          style={{
            fontSize: "16px",
            letterSpacing: "1px",
            fontWeight: 400,
            opacity: 0.85,
            color: "rgba(255,255,255,0.92)",
          }}
        >
          Bir anın içinde durabilenler için.
        </p>
        <div
          style={{
            width: "60px",
            height: "1px",
            background: "rgba(255,255,255,0.2)",
            margin: "0 auto 30px auto",
          }}
          aria-hidden
        />
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "1px",
            opacity: 0.5,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          Mavi Kadraj © 2026
        </p>
      </div>

      <p
        className="pointer-events-none absolute bottom-12 right-10 max-w-[calc(100%-4rem)] text-right font-sans leading-relaxed"
        style={{
          fontWeight: 400,
          opacity: 0.42,
          color: "rgba(255,255,255,0.88)",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            letterSpacing: "0.16em",
            fontWeight: 500,
            textTransform: "uppercase",
          }}
        >
          MAVİ KADRAJ
        </span>{" "}
        <span
          style={{
            fontSize: "8px",
            letterSpacing: "0.06em",
            fontWeight: 400,
            textTransform: "lowercase",
            opacity: 0.85,
          }}
        >
          by
        </span>{" "}
        <span
          style={{
            fontSize: "11px",
            letterSpacing: "0.16em",
            fontWeight: 500,
            textTransform: "uppercase",
          }}
        >
          MK DIGITAL SYSTEMS
        </span>
      </p>
    </footer>
  );
}
