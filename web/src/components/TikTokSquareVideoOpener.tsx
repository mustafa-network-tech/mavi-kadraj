"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function TikTokSquareVideoOpener({
  tiktokEmbedVideoId,
  tiktokEmbedCiteUrl,
}: {
  tiktokEmbedVideoId: string;
  tiktokEmbedCiteUrl: string;
}) {
  const [open, setOpen] = useState(false);
  const embedWrapperRef = useRef<HTMLDivElement | null>(null);

  const close = useCallback(() => setOpen(false), []);
  const canOpen = Boolean(tiktokEmbedVideoId && tiktokEmbedCiteUrl);

  const onOpen = useCallback(() => {
    if (!canOpen) return;
    setOpen(true);
  }, [canOpen]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;

    const scriptId = "tiktok-embed-js";
    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;

    const loadScript = () =>
      new Promise<void>((resolve) => {
        if (existing) {
          resolve();
          return;
        }
        const s = document.createElement("script");
        s.id = scriptId;
        s.async = true;
        s.src = "https://www.tiktok.com/embed.js";
        s.onload = () => resolve();
        document.body.appendChild(s);
      });

    const run = async () => {
      await loadScript();
      // Best-effort: trigger processing if available.
      const w = window as any;
      try {
        w?.tiktokEmbed?.load?.();
      } catch {
        // ignore
      }

      // Another best-effort hook.
      requestAnimationFrame(() => {
        try {
          w?.tiktok?.embed?.process?.();
        } catch {
          // ignore
        }
      });
    };

    void run();
  }, [open, tiktokEmbedVideoId, tiktokEmbedCiteUrl]);

  return (
    <>
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={onOpen}
          disabled={!canOpen}
          aria-label="TikTok videosunu aç"
          className="group flex h-14 w-14 items-center justify-center rounded-xl bg-white/[0.05] ring-1 ring-white/[0.12] shadow-[0_16px_56px_rgba(0,0,0,0.45)] backdrop-blur-md transition duration-300 hover:ring-[var(--mk-accent)]/40 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {/* Play icon */}
          <svg
            className="h-6 w-6 text-white/80 transition group-hover:text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M9 7v10l10-5-10-5z" />
          </svg>
        </button>
      </div>

      {open && canOpen ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0c1838]/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="TikTok video"
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-[201] flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition duration-200 hover:bg-white/20 hover:text-white hover:brightness-125 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mk-accent)]"
            aria-label="Kapat"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div ref={embedWrapperRef} className="relative mx-6 w-full max-w-2xl">
            <blockquote
              className="tiktok-embed"
              cite={tiktokEmbedCiteUrl}
              data-video-id={tiktokEmbedVideoId}
              style={{ maxWidth: "605px", width: "100%", margin: "0 auto" }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

