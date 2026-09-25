"use client";

import { useEffect, useRef, useState } from "react";
import { ACCURACY, areaOf, canNavigateTo, directionsUrl, formatDate, positionOf, uniquePositions } from "@/lib/map/photos";
import type { MapSelection } from "@/lib/map/types";

type Props = {
  selection: MapSelection;
  onClose: () => void;
  onZoom: (selection: MapSelection) => void;
};

/** Seçili noktanın fotoğraf kartı: masaüstünde harita üstünde, mobilde alttan açılan sayfa. */
export function PhotoMapCard({ selection, onClose, onZoom }: Props) {
  const { photos } = selection;
  const [index, setIndex] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const photo = photos[index];
  const spread = uniquePositions(photos).length > 1;
  const area = areaOf(photo);
  const date = formatDate(photo.dateTaken);

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, []);

  const step = (delta: number) => setIndex((current) => (current + delta + photos.length) % photos.length);

  return (
    <aside className="photo-map-card" aria-labelledby="photo-map-card-title">
      <span className="photo-map-card__handle" aria-hidden />
      <button type="button" className="photo-map-card__close" onClick={onClose} aria-label="Kartı kapat">×</button>
      <a className="photo-map-card__image" href={photo.imageUrl} target="_blank" rel="noopener noreferrer">
        {/* Arşivin hazır küçük önizlemesi; Next görsel optimizasyonuna gerek yok. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={photo.photoId} src={photo.thumbnailUrl} alt={photo.title || photo.placeName || "Arşiv fotoğrafı"} loading="lazy" decoding="async" />
      </a>
      <div className="photo-map-card__body">
        {photos.length > 1 && (
          <p className="photo-map-card__count">{spread ? "Bu bölgede" : "Bu noktada"} {photos.length} fotoğraf</p>
        )}
        <h2 id="photo-map-card-title" ref={heading} tabIndex={-1}>{photo.placeName || photo.title || "Fotoğraf"}</h2>
        {area && <p className="photo-map-card__meta">{area}</p>}
        {photo.category && <p className="photo-map-card__meta">{photo.category}</p>}
        {date && <p className="photo-map-card__meta">Çekim tarihi: {date}</p>}
        <p className={`photo-map-card__accuracy photo-map-card__accuracy--${photo.locationAccuracy}`}>{ACCURACY[photo.locationAccuracy].label}</p>
        <div className="photo-map-card__actions">
          <a href={photo.imageUrl} target="_blank" rel="noopener noreferrer">Fotoğrafı Gör ↗</a>
          {canNavigateTo(photo) && <a href={directionsUrl(positionOf(photo))} target="_blank" rel="noopener noreferrer">Buraya Git ↗</a>}
          {spread && <button type="button" onClick={() => onZoom(selection)}>Yakınlaştır</button>}
        </div>
        {photos.length > 1 && (
          <div className="photo-map-card__pager">
            <button type="button" onClick={() => step(-1)} aria-label="Önceki fotoğraf">← Önceki</button>
            <span aria-live="polite">{index + 1} / {photos.length}</span>
            <button type="button" onClick={() => step(1)} aria-label="Sonraki fotoğraf">Sonraki →</button>
          </div>
        )}
      </div>
    </aside>
  );
}
