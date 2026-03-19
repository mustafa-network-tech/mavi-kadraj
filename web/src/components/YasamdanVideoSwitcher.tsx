"use client";

import { useMemo, useRef, useState } from "react";
import type { YasamdanVideoItem } from "@/lib/site";

function clampIndex(i: number, len: number) {
  if (len <= 0) return 0;
  const mod = ((i % len) + len) % len;
  return mod;
}

export function YasamdanVideoSwitcher({
  videos,
}: {
  videos: YasamdanVideoItem[];
}) {
  const valid = useMemo(() => videos.filter((v) => v.type === "tiktok"), [videos]);
  const [index, setIndex] = useState(0);

  if (!valid.length) return null;

  const currentIndex = clampIndex(index, valid.length);
  const item = valid[currentIndex];
  const hasMultiple = valid.length > 1;
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const tryUnmute = () => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;
    // TikTok player messaging (embed-player docs) uses this payload shape.
    // We unmute after each src change so sound doesn't stay at 0/muted.
    try {
      iframe.contentWindow.postMessage(
        { type: "unMute", "x-tiktok-player": true, value: undefined },
        "*",
      );
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-[min(360px,90vw)]">
        <div className="relative w-full rounded-[1.5rem] bg-gradient-to-b from-[#1b6dff]/80 via-[#00b7ff]/50 to-[#00b7ff]/20 p-[2px] shadow-[0_0_0_1px_rgba(0,183,255,0.3),0_0_40px_rgba(0,183,255,0.15)]">
          <div className="rounded-[1.35rem] bg-[#0a0e14]/90 p-5 md:p-6">
            <div className="relative w-full overflow-hidden rounded-xl bg-black/40 aspect-[9/16]">
              <iframe
                src={`https://www.tiktok.com/player/v1/${item.videoId}?autoplay=1&loop=1&rel=0&controls=1&muted=0&volume_control=1&play_button=1`}
                title="TikTok"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
                ref={iframeRef}
                onLoad={tryUnmute}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setIndex((i) => i - 1)}
          disabled={!hasMultiple}
          className="group relative flex h-14 w-14 items-center justify-center rounded-[1.15rem] bg-gradient-to-b from-[#1b6dff]/80 via-[#00b7ff]/50 to-[#00b7ff]/20 p-[2px] shadow-[0_0_0_1px_rgba(0,183,255,0.22)] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Önceki video"
        >
          <span className="flex h-full w-full items-center justify-center rounded-[0.95rem] bg-[#0a0e14]/90 ring-1 ring-white/[0.10] backdrop-blur-md transition duration-300 group-hover:bg-[#0a0e14]/80 group-hover:ring-[var(--mk-accent)]/35 active:bg-white/[0.08] active:ring-[var(--mk-accent)]/45">
            {/* Left arrow */}
            <svg
              className="h-6 w-6 text-white/92 group-hover:text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="M11 19l-7-7 7-7" />
            </svg>
          </span>
        </button>

        <button
          type="button"
          onClick={() => setIndex((i) => i + 1)}
          disabled={!hasMultiple}
          className="group relative flex h-14 w-14 items-center justify-center rounded-[1.15rem] bg-gradient-to-b from-[#1b6dff]/80 via-[#00b7ff]/50 to-[#00b7ff]/20 p-[2px] shadow-[0_0_0_1px_rgba(0,183,255,0.22)] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Sonraki video"
        >
          <span className="flex h-full w-full items-center justify-center rounded-[0.95rem] bg-[#0a0e14]/90 ring-1 ring-white/[0.10] backdrop-blur-md transition duration-300 group-hover:bg-[#0a0e14]/80 group-hover:ring-[var(--mk-accent)]/35 active:bg-white/[0.08] active:ring-[var(--mk-accent)]/45">
            {/* Right arrow */}
            <svg
              className="h-6 w-6 text-white/92 group-hover:text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M13 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

