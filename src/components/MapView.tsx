// ✅ Full code for /src/components/MapView.tsx — Leaflet map (client only)
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

// Force default Leaflet marker icons from /public/leaflet
const defaultIcon = L.icon({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

// Sample data
type Dealio = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: string;
};

const SAMPLE_DEALIOS: Dealio[] = [
  { id: "1", name: "Joe’s Coffee – 2-for-1 Latte", lat: 51.5074, lng: -0.1278, category: "Food & Drink" },
  { id: "2", name: "Amy’s Bakery – 20% off",     lat: 51.515,  lng: -0.09,    category: "Food & Drink" },
  { id: "3", name: "FixIt Fast – Free Diagnosis", lat: 51.503,  lng: -0.08,    category: "Services"     },
  { id: "4", name: "Green Garden – 10% Plants",   lat: 51.509,  lng: -0.10,    category: "Home & Garden" },
  { id: "5", name: "Sunshine Cafe – Lunch Deal",  lat: 51.510,  lng: -0.12,    category: "Food & Drink" },
  { id: "6", name: "Tech Hub – Student Discount", lat: 51.505,  lng: -0.09,    category: "Electronics"  },
  { id: "7", name: "Art by Amy – 15% Prints",     lat: 51.512,  lng: -0.095,   category: "Arts & Crafts" },
  { id: "8", name: "Daniel’s Deli – Free Cookie", lat: 51.507,  lng: -0.11,    category: "Food & Drink" },
];

// Cluster badge
const createClusterCustomIcon = (cluster: any) =>
  L.divIcon({
    html: `<div style="
      background: rgba(0,0,0,0.75);
      color: #fff;
      width: 40px; height: 40px;
      display: grid; place-items: center;
      border-radius: 9999px;
      font-weight: 700;
    ">${cluster.getChildCount()}</div>`,
    className: "cluster-marker",
    iconSize: L.point(40, 40, true),
  });

export default function MapView() {
  const center: [number, number] = [51.5074, -0.1278]; // London

  return (
    <div className="h-screen w-screen">
      <MapContainer center={center} zoom={12} className="h-full w-full" scrollWheelZoom>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
          showCoverageOnHover={false}
          spiderfyOnMaxZoom
        >
          {SAMPLE_DEALIOS.map((d) => (
            <Marker key={d.id} position={[d.lat, d.lng]}>
              <Popup>
                <div className="space-y-1">
                  <div className="font-semibold">{d.name}</div>
                  <div className="text-xs text-gray-600">{d.category}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
