import React, { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import { loadLeaflet } from "../../../lib/leafletLoader";

const DEFAULT_CENTER: [number, number] = [35.4676, -97.5164];

/** Ghost pin positions from the city pilot demo (Scissortail Park area). */
const GHOST_PINS = [
  { x: "38%", y: "52%", tone: "green" as const },
  { x: "54%", y: "44%", tone: "orange" as const },
  { x: "62%", y: "58%", tone: "green" as const },
  { x: "46%", y: "66%", tone: "green" as const },
  { x: "71%", y: "48%", tone: "orange" as const },
];

const PopupJamMapBackdrop: React.FC = () => {
  const mapNodeRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    const node = mapNodeRef.current;
    if (!node || mapRef.current) return;

    let cancelled = false;
    let dispose: (() => void) | undefined;

    loadLeaflet()
      .then((L) => {
        if (cancelled || mapRef.current) return;

        const map = L.map(node, {
          center: DEFAULT_CENTER,
          zoom: 10,
          zoomControl: false,
          attributionControl: false,
          dragging: false,
          scrollWheelZoom: false,
          doubleClickZoom: false,
          touchZoom: false,
          boxZoom: false,
          keyboard: false,
        });

        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
          subdomains: "abcd",
          maxZoom: 19,
        }).addTo(map);

        mapRef.current = map;
        const resize = () => map.invalidateSize();
        const timers = [80, 250, 600].map((delay) => window.setTimeout(resize, delay));
        window.addEventListener("resize", resize);

        dispose = () => {
          timers.forEach((timer) => window.clearTimeout(timer));
          window.removeEventListener("resize", resize);
          map.remove();
          mapRef.current = null;
        };

        if (cancelled) dispose();
      })
      .catch(() => {
        /* Map backdrop is decorative — fail silently if CDN blocked */
      });

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <div className="project-backdrop project-backdrop--popup-jam" aria-hidden>
      <div ref={mapNodeRef} className="project-backdrop__map" />
      <div className="project-backdrop__pin-field">
        {GHOST_PINS.map((pin) => (
          <span
            key={`${pin.x}-${pin.y}`}
            className={`project-backdrop__pin project-backdrop__pin--${pin.tone}`}
            style={{ left: pin.x, top: pin.y }}
          />
        ))}
      </div>
      <div className="project-backdrop__veil project-backdrop__veil--popup-jam" />
    </div>
  );
};

export default PopupJamMapBackdrop;
