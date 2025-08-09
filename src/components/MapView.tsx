// ✅ Full code for /src/components/MapView.tsx — with extra sample markers
'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon paths for Vite/Next
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function MapView() {
  const center: [number, number] = [51.505, -0.09]; // London

  const markers: { id: number; position: [number, number]; label: string }[] = [
    { id: 1, position: [51.505, -0.09], label: 'Marker 1 - London Center' },
    { id: 2, position: [51.51, -0.1], label: 'Marker 2 - Slightly NW' },
    { id: 3, position: [51.503, -0.08], label: 'Marker 3 - Slightly SE' },
    { id: 4, position: [51.507, -0.087], label: 'Marker 4 - Near River Thames' },
    { id: 5, position: [51.515, -0.09], label: 'Marker 5 - North London' },
  ];

  return (
    <MapContainer center={center} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map((marker) => (
        <Marker key={marker.id} position={marker.position}>
          <Popup>{marker.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
