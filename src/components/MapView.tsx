// src/components/MapView.tsx — clustering with React-Leaflet v5
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";
import L from "leaflet";

// Fix Leaflet’s default marker icon
import icon from "leaflet/dist/images/marker-icon.png";
import shadow from "leaflet/dist/images/marker-shadow.png";
const defaultIcon = L.icon({ iconUrl: icon, shadowUrl: shadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = defaultIcon;

const sampleMarkers = [
  { id: 1, position: [51.505, -0.09], name: "Marker A" },
  { id: 2, position: [51.51, -0.1], name: "Marker B" },
  { id: 3, position: [51.515, -0.095], name: "Marker C" },
];

export default function MapView() {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup chunkedLoading>
        {sampleMarkers.map((m) => (
          <Marker key={m.id} position={m.position}>
            <Popup>{m.name}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
