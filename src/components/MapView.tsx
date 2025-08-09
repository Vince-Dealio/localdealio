// ✅ Full code for /src/components/MapView.tsx — safe client-side Leaflet
"use client";

import { useEffect, useState } from "react";
import type { MapContainerProps } from "react-leaflet";

export default function MapView(props: MapContainerProps) {
  const [LeafletMap, setLeafletMap] = useState<React.FC<MapContainerProps> | null>(null);

  useEffect(() => {
    // Only import Leaflet & React-Leaflet on client
    (async () => {
      const { MapContainer, TileLayer, Marker, Popup } = await import("react-leaflet");
      const L = await import("leaflet");

      // Optional: custom icon
      const DefaultIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      L.Marker.prototype.options.icon = DefaultIcon;

      // Define map component dynamically
      const MapComp: React.FC<MapContainerProps> = (p) => (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%" }} {...p}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
          </Marker>
        </MapContainer>
      );

      setLeafletMap(() => MapComp);
    })();
  }, []);

  if (!LeafletMap) return <p>Loading map...</p>;

  return <LeafletMap {...props} />;
}
