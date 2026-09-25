import type { LatLng, LocationAccuracy, LocationSource, MapFilters, MapPhoto, MapPlace } from "@/lib/map/types";

/** Tarayıcı ve sunucuda ortak, saf fonksiyonlar (Google Maps'e bağımlı değil). */

export const ACCURACY: Record<LocationAccuracy, { label: string; short: string; color: string }> = {
  exact: { label: "Kesin konum (GPS)", short: "Kesin konum", color: "#171817" },
  approximate: { label: "Yaklaşık konum (yer adı)", short: "Yaklaşık konum", color: "#3f6475" },
  city: { label: "Şehir / ilçe düzeyi", short: "Şehir / ilçe", color: "#a8694a" },
};
export const ACCURACY_LEVELS = Object.keys(ACCURACY) as LocationAccuracy[];
const SOURCES: LocationSource[] = ["exif", "metadata", "folder", "filename", "manual"];

export const DEFAULT_FILTERS: MapFilters = { query: "", category: null, accuracy: { exact: true, approximate: true, city: true } };

/** Arşivdeki kural: kesin konum yalnızca EXIF'ten gelir; 0,0 ve aralık dışı değerler reddedilir. */
export function isValidPhoto(photo: Partial<MapPhoto> | null | undefined): photo is MapPhoto {
  if (!photo || !photo.locationAccuracy || !Object.hasOwn(ACCURACY, photo.locationAccuracy)) return false;
  if (!photo.locationSource || !SOURCES.includes(photo.locationSource)) return false;
  if ((photo.locationAccuracy === "exact") !== (photo.locationSource === "exif")) return false;
  const { latitude: lat, longitude: lng } = photo;
  return typeof lat === "number" && typeof lng === "number" && Number.isFinite(lat) && Number.isFinite(lng) &&
    Math.abs(lat) <= 90 && Math.abs(lng) <= 180 && !(lat === 0 && lng === 0);
}

export const positionOf = (photo: MapPhoto): LatLng => ({ lat: photo.latitude, lng: photo.longitude });

/** Türkçe karakter ve büyük/küçük harf duyarsız arama anahtarı. */
export const fold = (value: string) =>
  value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i");

export function areaOf(photo: MapPhoto) {
  return [photo.district, photo.city].filter((value, i, all) => value && all.indexOf(value) === i && value !== photo.placeName).join(" / ");
}

export function filterPhotos(photos: MapPhoto[], filters: MapFilters) {
  const terms = fold(filters.query.trim()).split(/\s+/).filter(Boolean);
  return photos.filter((photo) => {
    if (!filters.accuracy[photo.locationAccuracy]) return false;
    if (filters.category && photo.category !== filters.category) return false;
    if (!terms.length) return true;
    const haystack = fold([photo.placeName, photo.district, photo.city, photo.category, photo.title].join(" "));
    return terms.every((term) => haystack.includes(term));
  });
}

export function categoriesOf(photos: MapPhoto[]) {
  const counts = new Map<string, number>();
  for (const photo of photos) if (photo.category) counts.set(photo.category, (counts.get(photo.category) ?? 0) + 1);
  return [...counts].map(([name, count]) => ({ name, count })).sort((a, b) => a.name.localeCompare(b.name, "tr"));
}

/** Bir grup, en kesin üyesinin stiliyle çizilir. */
export function groupAccuracy(photos: MapPhoto[]): LocationAccuracy {
  return ACCURACY_LEVELS.find((level) => photos.some((photo) => photo.locationAccuracy === level)) ?? "city";
}

/** Aynı koordinattaki fotoğrafları yer olarak toplar (en kalabalık yer önce). */
export function placesOf(photos: MapPhoto[]): MapPlace[] {
  const places = new Map<string, MapPhoto[]>();
  for (const photo of photos) {
    const key = `${photo.latitude},${photo.longitude}`;
    if (!places.has(key)) places.set(key, []);
    places.get(key)!.push(photo);
  }
  return [...places].map(([id, members]) => ({
    id,
    position: positionOf(members[0]),
    placeName: members[0].placeName || members[0].city || members[0].title,
    area: areaOf(members[0]),
    accuracy: groupAccuracy(members),
    photos: members,
  })).sort((a, b) => b.photos.length - a.photos.length || a.placeName.localeCompare(b.placeName, "tr"));
}

/**
 * Ekran ızgarası gruplaması (arşivdeki 48 px'lik davranış): yakın noktalar birleşir,
 * yakınlaştıkça ayrılır. `project` dünya koordinatını o anki zoom'daki piksele çevirir.
 */
export function groupByScreenCell(photos: MapPhoto[], project: (position: LatLng) => { x: number; y: number }, cell = 48) {
  const groups = new Map<string, MapPhoto[]>();
  for (const photo of photos) {
    const point = project(positionOf(photo));
    const key = `${Math.floor(point.x / cell)}:${Math.floor(point.y / cell)}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(photo);
  }
  return [...groups.values()];
}

export const uniquePositions = (photos: MapPhoto[]) => placesOf(photos).map((place) => place.position);

/** "Buraya Git": Google Maps yol tarifi. `origin` verilmezse Google kullanıcının konumunu kullanır. */
export function directionsUrl(destination: LatLng, origin?: LatLng) {
  const params = new URLSearchParams({ api: "1", destination: `${destination.lat},${destination.lng}` });
  if (origin) params.set("origin", `${origin.lat},${origin.lng}`);
  return `https://www.google.com/maps/dir/?${params}`;
}

/** Şehir düzeyindeki konumlar yol tarifi için fazla kaba; arşivdeki gibi yalnızca yer adı ve GPS konumlarında gösterilir. */
export const canNavigateTo = (photo: MapPhoto) => photo.locationAccuracy !== "city";

export function formatDate(value: string | null) {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }) : "";
}
