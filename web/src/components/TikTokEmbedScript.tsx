"use client";

import { useEffect } from "react";

const SCRIPT_ID = "tiktok-embed-js";

/** Loads TikTok embed.js once so blockquote.tiktok-embed elements on the page are turned into players. */
export function TikTokEmbedScript() {
  useEffect(() => {
    const existing = document.getElementById(SCRIPT_ID);

    const processEmbeds = () => {
      const w = window as any;
      try {
        w?.tiktokEmbed?.load?.();
      } catch {
        // ignore
      }
      try {
        w?.tiktok?.embed?.process?.();
      } catch {
        // ignore
      }
      // Let layout settle and try again once.
      setTimeout(() => {
        try {
          w?.tiktok?.embed?.process?.();
        } catch {
          // ignore
        }
      }, 50);
    };

    if (existing) {
      processEmbeds();
      return;
    }

    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.async = true;
    s.src = "https://www.tiktok.com/embed.js";
    s.onload = () => processEmbeds();
    document.body.appendChild(s);
  }, []);
  return null;
}
