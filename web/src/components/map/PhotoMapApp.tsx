"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PhotoMapCanvas } from "@/components/map/PhotoMapCanvas";
import { PhotoMapCard } from "@/components/map/PhotoMapCard";
import { PhotoMapPanel } from "@/components/map/PhotoMapPanel";
import { ACCURACY_LEVELS, DEFAULT_FILTERS, categoriesOf, filterPhotos, placesOf, uniquePositions } from "@/lib/map/photos";
import type { MapController, MapDataset, MapFilters, MapPlace, MapSelection } from "@/lib/map/types";

/**
 * Ana sitenin kendi Fotoğraf Haritası. Arşivden yalnızca konum verisi gelir.
 * Durum burada tutulur; ileride konum/rota katmanları `controller` üzerinden haritayı yönetir.
 */
export function PhotoMapApp({ dataset }: { dataset: MapDataset | null }) {
  const photos = useMemo(() => dataset?.photos ?? [], [dataset]);
  const [filters, setFilters] = useState<MapFilters>(DEFAULT_FILTERS);
  const [selection, setSelection] = useState<MapSelection | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const controller = useRef<MapController | null>(null);

  const filtered = useMemo(() => filterPhotos(photos, filters), [photos, filters]);
  const places = useMemo(() => placesOf(filtered), [filtered]);
  const categories = useMemo(() => categoriesOf(photos), [photos]);
  const levels = useMemo(() => ACCURACY_LEVELS.filter((level) => photos.some((photo) => photo.locationAccuracy === level)), [photos]);

  const changeFilters = useCallback((next: MapFilters) => {
    setFilters(next);
    setSelection(null);
  }, []);

  const select = useCallback((next: MapSelection | null) => {
    setSelection(next);
    if (next) setPanelOpen(false);
  }, []);

  const openPlace = useCallback((place: MapPlace) => {
    controller.current?.focus(place.position, 11);
    select({ photos: place.photos, position: place.position });
  }, [select]);

  const zoomTo = useCallback((current: MapSelection) => controller.current?.fitTo(uniquePositions(current.photos)), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelection(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="photo-map-app">
      <PhotoMapPanel
        total={photos.length} shown={filtered.length} places={places} categories={categories} levels={levels}
        filters={filters} onFilters={changeFilters} onPlace={openPlace}
        open={panelOpen} onOpen={setPanelOpen} dataMissing={!dataset}
      />
      <div className="photo-map-stage">
        <PhotoMapCanvas photos={filtered} selection={selection} onSelect={select} controllerRef={controller} />
        {selection && (
          <PhotoMapCard key={selection.photos.map((photo) => photo.photoId).join("|")} selection={selection} onClose={() => setSelection(null)} onZoom={zoomTo} />
        )}
      </div>
    </div>
  );
}
