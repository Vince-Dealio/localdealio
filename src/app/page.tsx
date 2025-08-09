// /src/app/page.tsx
"use client";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

export default function HomePage() {
  // Header in your layout is ~5rem (pt-20). Adjust if yours differs.
  return (
    <div className="fixed inset-0 top-20"> 
      <MapView />
    </div>
  );
}
