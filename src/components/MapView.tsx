// ✅ Full code for src/components/MapView.tsx
// Rule1: replace the current file with this version.

"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";
import L from "leaflet";

// TS-safe icon imports (Next returns StaticImageData)
import iconPng from "leaflet/dist/images/marker-icon.png";
import shadowPng from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: typeof iconPng === "string" ? iconPng : (iconPng as { src: string }).src,
  shadowUrl: typeof shadowPng === "string" ? shadowPng : (shadowPng as { src: string }).src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

type LatLngTuple = [number, number];
type MarkerData = { id: number; pos: LatLngTuple; label: string };

// Keep the raw data as readonly tuples so TypeScript preserves tuple length
const raw: ReadonlyArray<readonly [number, number, string]> = [
  [51.5074, -0.1278, "Trafalgar Sq"],
  [51.5033, -0.1196, "London Eye"],
  [51.5007, -0.1246, "Big Ben"],
  [51.5096, -0.1357, "Piccadilly"],
  [51.5155, -0.0922, "St Paul’s"],
  [51.5128, -0.0918, "Bank"],
  [51.4952, -0.1463, "Sloane Sq"],
  [51.5211, -0.104, "Barbican"],
  [51.5079, -0.0877, "London Bridge"],
  [51.5136, -0.158, "Marble Arch"],
  [51.5186, -0.0813, "Liverpool St"],
  [51.5031, -0.1131, "Waterloo"],
  [51.5299, -0.1276, "Euston"],
  [51.5362, -0.1406, "Camden"],
  [51.5143, -0.1497, "Oxford Circus"],
  [51.5101, -0.1337, "Leicester Sq"],
  [51.4957, -0.1722, "South Ken"],
  [51.5107, -0.0781, "Tower"],
  [51.5235, -0.1586, "Regent’s Park"],
  [51.4769, -0.0005, "Greenwich"],
];

const markers: MarkerData[] = raw.map(([lat, lng, label], i) => ({
  id: i + 1,
  pos: [lat, lng] as LatLngTuple,
  label,
}));

// Clamp to the "world" and prevent panning off-map
const WORLD_BOUNDS: L.LatLngBoundsExpression = [
  [-85, -180],
  [85, 180],
];

/** Bind a smooth flyTo on cluster clicks (typed, no ts-ignore) */
function useClusterSmoothZoom(clusterRef: React.RefObject<unknown>) {
  const map = useMap();

  useEffect(() => {
    const group =
      (clusterRef.current as (L.LayerGroup & L.Evented & { on: L.Evented["on"]; off: L.Evented["off"] }) | null);
    if (!group) return;

    const onClusterClick: L.LeafletEventHandlerFn = (e) => {
      const withLayer = e as L.LeafletEvent & { layer?: L.Marker };
      const layer = withLayer.layer;
      if (!layer) return;
      const latlng = layer.getLatLng();
      const nextZoom = Math.min(map.getZoom() + 2, map.getMaxZoom());
      map.flyTo(latlng, nextZoom, { duration: 0.8, easeLinearity: 0.25 });
    };

    group.on("clusterclick", onClusterClick);
    return () => {
      group.off("clusterclick", onClusterClick);
    };
  }, [clusterRef, map]);
}

function ZoomMarker(props: { position: LatLngTuple; label: string }) {
  const map = useMap();
  return (
    <Marker
      position={props.position}
      eventHandlers={{
        click: () => {
          const nextZoom = Math.min(map.getZoom() + 2, map.getMaxZoom());
          map.flyTo(props.position, nextZoom, { duration: 0.8, easeLinearity: 0.25 });
        },
      }}
    >
      <Popup>{props.label}</Popup>
    </Marker>
  );
}

/** Capture the map instance for use outside MapContainer */
function MapReady({ onMap }: { onMap: (m: L.Map) => void }) {
  const map = useMap();
  useEffect(() => {
    onMap(map);
  }, [map, onMap]);
  return null;
}

/** Pulsing "you are here" icon (DivIcon) */
const pulseIcon = L.divIcon({
  className: "ld-pulse-marker",
  html: '<span class="ld-pulse-inner"></span>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

export default function MapView() {
  const clusterRef = useRef<unknown>(null);
  const mapRef = useRef<L.Map | null>(null);

  const [userLoc, setUserLoc] = useState<L.LatLngExpression | null>(null);
  const [locating, setLocating] = useState(false);

  const handleLocate = () => {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported in this browser.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latlng: L.LatLngExpression = [pos.coords.latitude, pos.coords.longitude];
        setUserLoc(latlng);
        const map = mapRef.current;
        if (map) {
          const targetZoom = Math.max(map.getZoom(), 14);
          map.flyTo(latlng, targetZoom, { duration: 1.1, easeLinearity: 0.25 });
        }
        setLocating(false);
      },
      (err) => {
        console.warn("Geolocation error:", err.message);
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  return (
    <div className="h-full w-full relative">
      {/* tiny CSS for pulse marker */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .ld-pulse-marker { position: relative; }
          .ld-pulse-marker .ld-pulse-inner {
            display:block; width:12px; height:12px; background:#0ea5e9; border-radius:50%;
            box-shadow: 0 0 0 rgba(14,165,233,0.7);
            animation: ld-pulse 2s infinite;
          }
          @keyframes ld-pulse {
            0%   { box-shadow: 0 0 0 0 rgba(14,165,233,0.55); }
            70%  { box-shadow: 0 0 0 12px rgba(14,165,233,0); }
            100% { box-shadow: 0 0 0 0 rgba(14,165,233,0); }
          }
        `,
        }}
      />

      <MapContainer
        center={[20, 0]} // world-ish center
        zoom={3} // start zoomed out
        minZoom={3}
        maxZoom={19}
        zoomControl={false}
        scrollWheelZoom={true}
        worldCopyJump={true}
        maxBounds={WORLD_BOUNDS}
        maxBoundsViscosity={1.0}
        style={{ height: "100%", width: "100%", background: "#000" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          minZoom={3}
          maxZoom={19}
          maxNativeZoom={19}
          detectRetina
        />

        {/* Smooth cluster clicks; disable jump-to-bounds */}
        <MarkerClusterGroup
          ref={clusterRef}
          chunkedLoading
          spiderfyOnMaxZoom
          zoomToBoundsOnClick={false}
          showCoverageOnHover={false}
        >
          <SmoothClusterHook clusterRef={clusterRef} />
          {markers.map((m) => (
            <ZoomMarker key={m.id} position={m.pos} label={m.label} />
          ))}
        </MarkerClusterGroup>

        {/* User location marker (if available) */}
        {userLoc && (
          <Marker position={userLoc} icon={pulseIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {/* capture map ref */}
        <MapReady onMap={(m) => (mapRef.current = m)} />
      </MapContainer>

      {/* Locate Me floating button (bottom-right) */}
      <button
        type="button"
        onClick={handleLocate}
        disabled={locating}
        aria-label="Locate me"
        className="absolute bottom-4 right-4 z-[1000] rounded-full bg-white/95 hover:bg-white text-gray-800 shadow-lg ring-1 ring-black/10 p-3 disabled:opacity-60"
        title="Locate me"
      >
        {/* target/crosshair icon */}
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 3v2m0 14v2m9-9h-2M5 12H3m14 0a5 5 0 10-10 0 5 5 0 0010 0z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

function SmoothClusterHook({ clusterRef }: { clusterRef: React.RefObject<unknown> }) {
  useClusterSmoothZoom(clusterRef);
  return null;
}
