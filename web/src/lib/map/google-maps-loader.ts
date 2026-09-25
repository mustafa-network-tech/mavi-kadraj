/**
 * Google Maps JavaScript API'yi resmi async yöntemle, sayfa başına bir kez yükler.
 * Marker kütüphanesi veya map ID gerekmez (noktalar Data katmanında çizilir).
 */

export type MapsLoadError = "missing-key" | "auth" | "network" | "timeout";

export const GOOGLE_MAPS_API_KEY = (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "").trim();

declare global {
  interface Window {
    __maviMapsReady?: () => void;
    gm_authFailure?: () => void;
  }
}

let pending: Promise<typeof google.maps> | null = null;
const authListeners = new Set<() => void>();

/** Yetkilendirme hatası Google tarafından yükleme sonrasında da bildirilebilir. */
export function onMapsAuthFailure(listener: () => void) {
  authListeners.add(listener);
  return () => void authListeners.delete(listener);
}

export function loadGoogleMaps(): Promise<typeof google.maps> {
  if (typeof window !== "undefined" && window.google?.maps?.Map) return Promise.resolve(window.google.maps);
  if (pending) return pending;
  pending = new Promise<typeof google.maps>((resolve, reject) => {
    if (!GOOGLE_MAPS_API_KEY) return reject("missing-key" satisfies MapsLoadError);
    const timer = window.setTimeout(() => fail("timeout"), 20_000);
    function fail(reason: MapsLoadError) {
      window.clearTimeout(timer);
      pending = null;
      reject(reason);
    }
    window.gm_authFailure = () => {
      fail("auth");
      authListeners.forEach((listener) => listener());
    };
    window.__maviMapsReady = () => {
      window.clearTimeout(timer);
      resolve(window.google.maps);
    };
    const params = new URLSearchParams({ key: GOOGLE_MAPS_API_KEY, loading: "async", callback: "__maviMapsReady", v: "weekly", language: "tr", region: "TR" });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://maps.googleapis.com/maps/api/js?${params}`;
    script.onerror = () => {
      script.remove();
      fail("network");
    };
    document.head.append(script);
  });
  return pending;
}
