// /src/components/MapView.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";
import L from "leaflet";

import iconPng from "leaflet/dist/images/marker-icon.png";
import shadowPng from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: typeof iconPng === "string" ? iconPng : (iconPng as { src: string }).src,
  shadowUrl: typeof shadowPng === "string" ? shadowPng : (shadowPng as { src: string }).src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

const markers = [
  { id: 1, pos: [51.5074, -0.1278] as [number, number], label: "Trafalgar Sq" },
  { id: 2, pos: [51.5033, -0.1196], label: "London Eye" },
  { id: 3, pos: [51.5007, -0.1246], label: "Big Ben" },
  // add more as needed
];

export default function MapView() {
  return (
    <div className="h-full w-full">
      <MapContainer center={[51.5074, -0.1278]} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
