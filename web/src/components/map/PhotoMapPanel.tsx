"use client";

import { ACCURACY, ACCURACY_LEVELS } from "@/lib/map/photos";
import type { LocationAccuracy, MapFilters, MapPlace } from "@/lib/map/types";

type Props = {
  total: number;
  shown: number;
  places: MapPlace[];
  categories: { name: string; count: number }[];
  levels: LocationAccuracy[];
  filters: MapFilters;
  onFilters: (filters: MapFilters) => void;
  onPlace: (place: MapPlace) => void;
  open: boolean;
  onOpen: (open: boolean) => void;
  dataMissing: boolean;
};

/** Arama, kategori/konum kesinliği filtreleri ve yer listesi. Mobilde üstte arama, altında açılır gövde. */
export function PhotoMapPanel({ total, shown, places, categories, levels, filters, onFilters, onPlace, open, onOpen, dataMissing }: Props) {
  const activeFilters = (filters.category ? 1 : 0) + ACCURACY_LEVELS.filter((level) => levels.includes(level) && !filters.accuracy[level]).length;
  const set = (patch: Partial<MapFilters>) => onFilters({ ...filters, ...patch });

  return (
    <section className={`photo-map-panel ${open ? "is-open" : ""}`} aria-label="Harita araçları">
      <header className="photo-map-panel__intro">
        <p className="exhibition-kicker">Fotoğraf Haritası</p>
        <h1>Karelerin <em>çekildiği yerler.</em></h1>
        <p>Mavi Kadraj objektifinden Türkiye’nin farklı noktaları. Konumu bilinmeyen fotoğraflar haritada gösterilmez.</p>
      </header>

      <div className="photo-map-panel__search">
        <label htmlFor="photo-map-search" className="sr-only">Yer, şehir veya konu ara</label>
        <input
          id="photo-map-search" type="search" value={filters.query} placeholder="Yer, şehir veya konu ara"
          autoComplete="off" onChange={(event) => set({ query: event.target.value })}
        />
        <button type="button" className="photo-map-panel__toggle" aria-expanded={open} aria-controls="photo-map-panel-body" onClick={() => onOpen(!open)}>
          {open ? "Kapat" : `Liste${activeFilters ? ` · ${activeFilters}` : ""}`}
        </button>
      </div>

      <div id="photo-map-panel-body" className="photo-map-panel__body">
        <p className="photo-map-panel__summary" role="status">
          {dataMissing ? "Fotoğraf konumları şu anda alınamadı. Lütfen daha sonra tekrar deneyin." :
            shown === total ? `${total} fotoğraf · ${places.length} nokta` : `${shown} / ${total} fotoğraf · ${places.length} nokta`}
        </p>

        {categories.length > 1 && (
          <fieldset className="photo-map-panel__group">
            <legend>Konu</legend>
            <div className="photo-map-chips">
              <button type="button" aria-pressed={!filters.category} onClick={() => set({ category: null })}>Tümü</button>
              {categories.map((category) => (
                <button key={category.name} type="button" aria-pressed={filters.category === category.name} onClick={() => set({ category: filters.category === category.name ? null : category.name })}>
                  {category.name} <span>{category.count}</span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {levels.length > 0 && (
          <fieldset className="photo-map-panel__group">
            <legend>Konum kesinliği</legend>
            <div className="photo-map-legend">
              {levels.map((level) => (
                <label key={level}>
                  <input type="checkbox" checked={filters.accuracy[level]} onChange={(event) => set({ accuracy: { ...filters.accuracy, [level]: event.target.checked } })} />
                  <span className="photo-map-legend__dot" style={{ background: ACCURACY[level].color }} aria-hidden />
                  {ACCURACY[level].label}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        <div className="photo-map-panel__group">
          <p className="photo-map-panel__label">Noktalar</p>
          {places.length ? (
            <ul className="photo-map-places">
              {places.map((place) => (
                <li key={place.id}>
                  <button type="button" onClick={() => onPlace(place)}>
                    <span className="photo-map-legend__dot" style={{ background: ACCURACY[place.accuracy].color }} aria-hidden />
                    <span><strong>{place.placeName}</strong>{place.area && <small>{place.area}</small>}</span>
                    <em>{place.photos.length}</em>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="photo-map-panel__empty">{dataMissing ? "Gösterilecek nokta yok." : "Bu aramaya uyan fotoğraf noktası yok."}</p>
          )}
        </div>
      </div>
    </section>
  );
}
