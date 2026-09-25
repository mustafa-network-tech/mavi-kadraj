"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { loadGoogleMaps, onMapsAuthFailure, type MapsLoadError } from "@/lib/map/google-maps-loader";
import { ACCURACY, groupAccuracy, groupByScreenCell, positionOf } from "@/lib/map/photos";
import type { MapController, MapPhoto, MapSelection } from "@/lib/map/types";

type Status = "loading" | "ready" | "init" | MapsLoadError;

const STATUS_COPY: Record<Exclude<Status, "ready">, [string, string]> = {
  loading: ["Harita hazırlanıyor", "Google Maps yükleniyor…"],
  "missing-key": ["Harita yapılandırması gerekli", "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY tanımlı değil. Fotoğraf noktalarını yandaki listeden inceleyebilirsiniz."],
  auth: ["Harita açılamadı", "Google Maps yetkilendirmesi başarısız. API anahtarının bu alan adına izin verdiğini kontrol edin."],
  network: ["Harita yüklenemedi", "Bağlantınızı kontrol edip sayfayı yeniden yükleyin."],
  timeout: ["Harita yüklenemedi", "Google Maps zamanında yanıt vermedi. Lütfen sayfayı yeniden yükleyin."],
  init: ["Harita açılamadı", "Google Maps başlatılamadı. Lütfen sayfayı yeniden yükleyin."],
};

/** Sade, kâğıt tonlu harita; POI ve toplu taşıma kapalı. Map ID gerektirmez. */
const MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#ece9e1" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#5b605e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f1efe9" }] },
  { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#e4e1d7" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#c6d4da" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#51707d" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#f8f6f1" }] },
  { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#bab5aa" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
];

type Props = {
  photos: MapPhoto[];
  selection: MapSelection | null;
  onSelect: (selection: MapSelection | null) => void;
  controllerRef: RefObject<MapController | null>;
};

export function PhotoMapCanvas({ photos, selection, onSelect, controllerRef }: Props) {
  const element = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const layerRef = useRef<google.maps.Data | null>(null);
  const groupsRef = useRef<MapPhoto[][]>([]);
  const redrawRef = useRef<() => void>(() => {});
  const onSelectRef = useRef(onSelect);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    let cancelled = false;
    const listeners: google.maps.MapsEventListener[] = [];
    const offAuth = onMapsAuthFailure(() => setStatus("auth"));
    loadGoogleMaps().then((maps) => {
      if (cancelled || !element.current) return;
      try {
        const width = element.current.clientWidth;
        const map = new maps.Map(element.current, {
          center: { lat: 39.0, lng: 35.0 },
          zoom: width < 600 ? 5 : width < 1000 ? 5 : 6,
          styles: MAP_STYLES,
          gestureHandling: "greedy",
          clickableIcons: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: width >= 900,
          zoomControl: true,
        });
        const layer = new maps.Data({ map });
        layer.setStyle((feature) => {
          const count = Number(feature.getProperty("count"));
          const selected = Boolean(feature.getProperty("selected"));
          const level = ACCURACY[feature.getProperty("accuracy") as keyof typeof ACCURACY];
          return {
            icon: {
              path: maps.SymbolPath.CIRCLE,
              scale: (count > 99 ? 19 : count > 9 ? 16 : 13) + (selected ? 3 : 0),
              fillColor: level.color, fillOpacity: 1,
              strokeColor: selected ? "#171817" : "#f8f6f1", strokeWeight: selected ? 3 : 2,
            },
            label: { text: String(count), color: "#f8f6f1", fontSize: "12px", fontWeight: "500", fontFamily: "Outfit, system-ui, sans-serif" },
            title: `${count} fotoğraf · ${level.short}`,
            cursor: "pointer",
            zIndex: selected ? 10 : 1,
          };
        });
        listeners.push(
          layer.addListener("click", (event: google.maps.Data.MouseEvent) => {
            const members = groupsRef.current[Number(event.feature.getProperty("index"))];
            if (members) onSelectRef.current({ photos: members, position: positionOf(members[0]) });
          }),
          map.addListener("click", () => onSelectRef.current(null)),
          map.addListener("idle", () => redrawRef.current()),
        );
        mapRef.current = map;
        layerRef.current = layer;
        controllerRef.current = {
          focus(position, zoom = 11) {
            map.panTo(position);
            map.setZoom(Math.max(map.getZoom() ?? 0, zoom));
          },
          fitTo(positions) {
            if (positions.length === 1) return this.focus(positions[0]);
            if (!positions.length) return;
            const bounds = new maps.LatLngBounds();
            positions.forEach((position) => bounds.extend(position));
            map.fitBounds(bounds, 64);
          },
        };
        setStatus("ready");
      } catch {
        setStatus("init");
      }
    }, (reason: MapsLoadError) => {
      if (!cancelled) setStatus(reason);
    });
    return () => {
      cancelled = true;
      offAuth();
      listeners.forEach((listener) => listener.remove());
      layerRef.current?.setMap(null);
      layerRef.current = null;
      mapRef.current = null;
      controllerRef.current = null;
    };
  }, [controllerRef]);

  // Filtre veya seçim değişince grupları yeniden çiz; her zoom/kaydırma sonunda da (idle).
  useEffect(() => {
    const selectedId = selection?.photos[0]?.photoId;
    redrawRef.current = () => {
      const map = mapRef.current, layer = layerRef.current, projection = map?.getProjection();
      if (!map || !layer || !projection) return;
      const scale = 2 ** (map.getZoom() ?? 0);
      const groups = groupByScreenCell(photos, (position) => {
        const point = projection.fromLatLngToPoint(position)!;
        return { x: point.x * scale, y: point.y * scale };
      });
      groupsRef.current = groups;
      layer.forEach((feature) => layer.remove(feature));
      groups.forEach((members, index) => layer.add({
        id: index,
        geometry: new google.maps.Data.Point(positionOf(members[0])),
        properties: { index, count: members.length, accuracy: groupAccuracy(members), selected: members.some((photo) => photo.photoId === selectedId) },
      }));
    };
    redrawRef.current();
  }, [photos, selection, status]);

  const copy = status === "ready" ? null : STATUS_COPY[status];
  return (
    <div className="photo-map-canvas">
      <div ref={element} className="photo-map-canvas__map" aria-label="Türkiye fotoğraf haritası" hidden={status !== "ready" && status !== "loading"} />
      {copy && (
        <div className="photo-map-canvas__status" role="status" aria-live="polite">
          <strong>{copy[0]}</strong>
          <p>{copy[1]}</p>
        </div>
      )}
    </div>
  );
}
