"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useState } from "react";

const Z_LAYER = 50000;

const NAV_ITEMS = [
  { href: "/", label: "Ana sayfa" },
  { href: "/kadraj-yansimalari", label: "Kadraj yansımaları" },
  { href: "/yasamdan-yansimalar", label: "Yaşamdan Yansımalar" },
  { href: "/kadrajin-otesi", label: "Kadrajın Ötesi" },
] as const;

/**
 * Mobil: kamera ikonu = normal tam ekran menü. Flaş/ses yok.
 * Tek `onClick` — touchEnd ile yatay kayma / çift tetiklenme riski yok.
 */
export function HeaderMobileCameraMenu() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    if (!open || typeof document === "undefined") return;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const portal =
    open && typeof document !== "undefined"
      ? createPortal(
          <div
            id="mk-mobile-nav"
            className="fixed inset-0 box-border flex w-full max-w-full flex-col bg-[#0c1218] md:hidden"
            style={{
              zIndex: Z_LAYER,
              paddingTop: "env(safe-area-inset-top, 0px)",
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
              overscrollBehavior: "contain",
              touchAction: "auto",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menüsü"
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-3">
              <span className="text-sm tracking-wide text-[var(--mk-muted)]">
                Menü
              </span>
              <button
                type="button"
                onClick={close}
                className="rounded-lg border border-white/[0.15] bg-white/[0.06] px-4 py-2 text-sm text-[#d4dce8] active:bg-white/[0.1]"
              >
                Kapat
              </button>
            </div>
            <nav
              className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-2 py-4"
              aria-label="Gezinme"
              style={{ WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}
            >
              <ul className="flex flex-col gap-0.5">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className="block rounded-lg px-4 py-4 text-base tracking-wide text-[#e8eef4] active:bg-white/[0.08]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      {portal}
      <div className="relative z-[80] md:hidden">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls={open ? "mk-mobile-nav" : undefined}
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          className="flex h-11 w-11 shrink-0 cursor-pointer touch-manipulation select-none items-center justify-center rounded-xl border border-white/[0.12] bg-[#0c1218]/40 text-[#c8dff2] backdrop-blur-sm active:bg-white/[0.06]"
        >
          <CameraIcon className="pointer-events-none h-6 w-6" aria-hidden />
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
