/** Load Leaflet from CDN — matches popup-jam demo; avoids bundler/npm sync issues. */
type LeafletApi = typeof import("leaflet").default;

export type LeafletRuntime = LeafletApi;

let loadPromise: Promise<LeafletRuntime> | null = null;

function ensureLeafletCss(): void {
  if (document.getElementById("leaflet-cdn-css")) return;
  const link = document.createElement("link");
  link.id = "leaflet-cdn-css";
  link.rel = "stylesheet";
  link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
  link.crossOrigin = "";
  document.head.appendChild(link);
}

export function loadLeaflet(): Promise<LeafletRuntime> {
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    ensureLeafletCss();

    const existing = (window as Window & { L?: LeafletRuntime }).L;
    if (existing) {
      resolve(existing);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    script.crossOrigin = "";
    script.async = true;
    script.onload = () => {
      const L = (window as Window & { L?: LeafletRuntime }).L;
      if (L) resolve(L);
      else reject(new Error("Leaflet failed to load"));
    };
    script.onerror = () => reject(new Error("Leaflet script failed to load"));
    document.head.appendChild(script);
  });

  return loadPromise;
}
