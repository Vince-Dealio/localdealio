// ✅ Full code for src/components/MapView.tsx
// Rule1: replace the current file with this version.

"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";
import L from "leaflet";

// TS-safe icon imports (Next returns StaticImageData)
import iconPng from "leaflet/dist/images/marker-icon.png";
import shadowPng from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: typeof iconPng === "string" ? iconPng : (iconPng as { src: string }).src,
  shadowUrl: typeof shadowPng === "string" ? shadowPng : (shadowPng as { src: string }).src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

type LatLngTuple = [number, number];
type MarkerData = { id: number; pos: LatLngTuple; label: string };

// Keep the raw data as readonly tuples so TypeScript preserves tuple length
const raw: ReadonlyArray<readonly [number, number, string]> = [
  [51.5074, -0.1278, "Trafalgar Sq"],
  [51.5033, -0.1196, "London Eye"],
  [51.5007, -0.1246, "Big Ben"],
  [51.5096, -0.1357, "Piccadilly"],
  [51.5155, -0.0922, "St Paul’s"],
  [51.5128, -0.0918, "Bank"],
  [51.4952, -0.1463, "Sloane Sq"],
  [51.5211, -0.104, "Barbican"],
  [51.5079, -0.0877, "London Bridge"],
  [51.5136, -0.158, "Marble Arch"],
  [51.5186, -0.0813, "Liverpool St"],
  [51.5031, -0.1131, "Waterloo"],
  [51.5299, -0.1276, "Euston"],
  [51.5362, -0.1406, "Camden"],
  [51.5143, -0.1497, "Oxford Circus"],
  [51.5101, -0.1337, "Leicester Sq"],
  [51.4957, -0.1722, "South Ken"],
  [51.5107, -0.0781, "Tower"],
  [51.5235, -0.1586, "Regent’s Park"],
  [51.4769, -0.0005, "Greenwich"],
];

const markers: MarkerData[] = raw.map(([lat, lng, label], i) => ({
  id: i + 1,
  pos: [lat, lng] as LatLngTuple,
  label,
}));

// Clamp to the "world" and prevent panning off-map
const WORLD_BOUNDS: L.LatLngBoundsExpression = [
  [-85, -180],
  [85, 180],
];

export default function MapView() {
  return (
    <div className="h-full w-full">
      <MapContainer
        // Center roughly at the equator/prime meridian so the world view feels balanced
        center={[20, 0]}
        // Open zoomed out so most of the world is visible
        zoom={3}
        // Allow a touch more zoom-out if needed (but avoid grey bands)
        minZoom={3}
        // Keep rich detail available when zooming in
        maxZoom={19}
        // UI polish
        zoomControl={false}
        scrollWheelZoom={true}
        worldCopyJump={true}
        maxBounds={WORLD_BOUNDS}
        maxBoundsViscosity={1.0}
        style={{ height: "100%", width: "100%", background: "#000" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          minZoom={3}
          maxZoom={19}
          maxNativeZoom={19}
          detectRetina
        />

        <MarkerClusterGroup chunkedLoading>
          {markers.map((m) => (
            <Marker key={m.id} position={m.pos}>
              <Popup>{m.label}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
