/** Minimal Leaflet types for CDN-loaded runtime (no npm `leaflet` package required). */
declare module "leaflet" {
  export type LatLngExpression = [number, number] | { lat: number; lng: number };

  export interface MapOptions {
    center?: LatLngExpression;
    zoom?: number;
    zoomControl?: boolean;
    attributionControl?: boolean;
    dragging?: boolean;
    scrollWheelZoom?: boolean;
    doubleClickZoom?: boolean;
    touchZoom?: boolean;
    boxZoom?: boolean;
    keyboard?: boolean;
  }

  export interface TileLayerOptions {
    subdomains?: string | string[];
    maxZoom?: number;
  }

  export interface TileLayer {
    addTo(map: Map): this;
  }

  export class Map {
    constructor(element: HTMLElement | string, options?: MapOptions);
    remove(): void;
    invalidateSize(): void;
  }

  export function map(element: HTMLElement | string, options?: MapOptions): Map;
  export function tileLayer(url: string, options?: TileLayerOptions): TileLayer;

  const L: {
    map: typeof map;
    tileLayer: typeof tileLayer;
    Map: typeof Map;
  };

  export default L;
}
