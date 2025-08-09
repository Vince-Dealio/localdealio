// ✅ Full code for src/components/MapView.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import shadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: (icon as any).src ?? icon, // ensure string
  shadowUrl: (shadow as any).src ?? shadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

const sampleMarkers = [
  { position: [51.505, -0.09], popup: "Marker 1" },
  { position: [51.51, -0.1], popup: "Marker 2" },
  { position: [51.49, -0.08], popup: "Marker 3" },
];

export default function MapView() {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {sampleMarkers.map((marker, idx) => (
        <Marker key={idx} position={marker.position}>
          <Popup>{marker.popup}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
