// /src/app/page.tsx
"use client";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

export default function HomePage() {
  // Remove the top offset so the map fills the viewport edge-to-edge.
  return (
    <div className="fixed inset-0">
      <MapView />
    </div>
  );
}
