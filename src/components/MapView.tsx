// ✅ Full code for /src/components/MapView.tsx — CSP-safe local marker icons
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default icon paths to use local images in /public/leaflet/
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "/leaflet/marker-icon.png",
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

export default function MapView() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[14.5995, 120.9842]} // Manila coordinates
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Example markers */}
        <Marker position={[14.5995, 120.9842]}>
          <Popup>Manila City Center</Popup>
        </Marker>

        <Marker position={[14.5566, 121.0215]}>
          <Popup>Makati City</Popup>
        </Marker>

        <Marker position={[14.6760, 121.0437]}>
          <Popup>Quezon City</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
