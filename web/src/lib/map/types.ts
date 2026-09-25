/**
 * Fotoğraf Haritası veri sözleşmesi.
 *
 * Veri, arşivin `scripts/build-map-locations.cjs` betiğinin ürettiği
 * `arsiv.mavikadraj.com.tr/data/map-locations.json` dosyasından gelir. Koordinatlar
 * yalnızca EXIF GPS (exact) veya arşivde elle doğrulanmış yer kayıtlarıdır
 * (approximate / city); burada tahmin veya geocoding yapılmaz.
 *
 * İleride eklenecek özellikler (konumum, A → B rota, rota üzerindeki noktalar,
 * çekim rehberi, öneriler) bu tipleri ve `MapController` arayüzünü genişletir;
 * harita çizimi `PhotoMapCanvas` içinde kalır.
 */

export type LatLng = { lat: number; lng: number };

export type LocationAccuracy = "exact" | "approximate" | "city";
export type LocationSource = "exif" | "metadata" | "folder" | "filename" | "manual";

export type MapPhoto = {
  photoId: string;
  title: string;
  /** Arşivdeki orijinal görselin mutlak URL'si. */
  imageUrl: string;
  /** Arşivdeki küçük önizlemenin mutlak URL'si (yoksa orijinal). */
  thumbnailUrl: string;
  city: string;
  district: string;
  placeName: string;
  latitude: number;
  longitude: number;
  locationAccuracy: LocationAccuracy;
  locationSource: LocationSource;
  category: string;
  dateTaken: string | null;
};

export type MapDataset = {
  photos: MapPhoto[];
  /** Verinin alındığı arşiv kökü. */
  source: string;
};

/** Aynı koordinattaki fotoğraflar; panel listesinde bir satır. */
export type MapPlace = {
  id: string;
  position: LatLng;
  placeName: string;
  area: string;
  accuracy: LocationAccuracy;
  photos: MapPhoto[];
};

/** Seçili harita noktası (tek yer ya da ekranda birleşen grup). */
export type MapSelection = { photos: MapPhoto[]; position: LatLng };

export type MapFilters = {
  query: string;
  category: string | null;
  accuracy: Record<LocationAccuracy, boolean>;
};

/** Harita dışındaki bileşenlerin haritayı yönlendirmesi için. Rota/konum özellikleri buraya eklenir. */
export type MapController = {
  focus(position: LatLng, zoom?: number): void;
  fitTo(positions: LatLng[]): void;
};
