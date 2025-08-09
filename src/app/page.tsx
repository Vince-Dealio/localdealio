// ✅ Full code for /src/app/page.tsx — Client-only Leaflet Map
"use client";

import dynamic from "next/dynamic";

// ✅ Dynamically import the Map component only on client
const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

export default function HomePage() {
  return <MapView />;
}
