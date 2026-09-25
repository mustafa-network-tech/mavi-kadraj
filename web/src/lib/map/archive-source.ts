import { isValidPhoto } from "@/lib/map/photos";
import type { MapDataset, MapPhoto } from "@/lib/map/types";

/** Yalnızca sunucuda kullanılır. Arşiv yalnızca veri kaynağıdır; harita sayfası buradan alınmaz. */
export const ARCHIVE_URL = (process.env.MAVI_ARCHIVE_URL || "https://arsiv.mavikadraj.com.tr").replace(/\/+$/, "");
export const MAP_DATA_REVALIDATE = 3600;

const text = (value: unknown) => (typeof value === "string" ? value : "");

function normalize(raw: Record<string, unknown>, base: string): MapPhoto | null {
  const imageUrl = text(raw.imageUrl);
  if (!imageUrl) return null;
  const photo = {
    photoId: text(raw.photoId) || imageUrl,
    title: text(raw.title),
    imageUrl: new URL(imageUrl, base).href,
    thumbnailUrl: new URL(text(raw.thumbnailUrl) || imageUrl, base).href,
    city: text(raw.city),
    district: text(raw.district),
    placeName: text(raw.placeName),
    latitude: raw.latitude,
    longitude: raw.longitude,
    locationAccuracy: raw.locationAccuracy,
    locationSource: raw.locationSource,
    category: text(raw.category),
    dateTaken: text(raw.dateTaken) || null,
  } as MapPhoto;
  return isValidPhoto(photo) ? photo : null;
}

/** Arşivin `data/map-locations.json` beslemesini okur. Hata olursa `null` döner; sayfa haritayı veri olmadan açar. */
export async function loadArchiveMapData(): Promise<MapDataset | null> {
  try {
    const response = await fetch(`${ARCHIVE_URL}/data/map-locations.json`, {
      next: { revalidate: MAP_DATA_REVALIDATE },
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = (await response.json()) as { photos?: unknown };
    if (!Array.isArray(data.photos)) throw new Error("photos missing");
    const photos = data.photos
      .map((item) => (item && typeof item === "object" ? normalize(item as Record<string, unknown>, `${ARCHIVE_URL}/`) : null))
      .filter((photo): photo is MapPhoto => photo !== null);
    return { photos, source: ARCHIVE_URL };
  } catch (error) {
    console.error("[harita] Arşiv konum verisi alınamadı:", error);
    return null;
  }
}
