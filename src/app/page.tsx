// ✅ Full code for /src/app/page.tsx — Client Component wrapper for MapView
'use client';

import dynamic from 'next/dynamic';

// Load the Leaflet map only on the client (no SSR to avoid `window` errors)
const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

export default function HomePage() {
  return <MapView />;
}
