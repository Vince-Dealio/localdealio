# RuleDev4-LeafletLocalIcons

## Purpose
When using Leaflet in a Next.js project, **never load default marker icons from an external CDN** (like `unpkg.com`) because:
- CSP rules may block them
- They can slow down page load
- External resources can break if CDN changes

Instead, **always store marker icons locally** in `/public/leaflet/` and set the icon paths in a custom `L.icon()` config.

---

## Steps to Implement
1. Create a folder:
2. Download these two files from Leaflet’s GitHub or unpkg and save locally:
- `marker-icon.png`
- `marker-shadow.png`

3. In your Leaflet component (e.g., `/src/components/MapView.tsx`), add:

```ts
import L from "leaflet";

const DefaultIcon = L.icon({
iconUrl: "/leaflet/marker-icon.png",
shadowUrl: "/leaflet/marker-shadow.png",
iconSize: [25, 41],
iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;
Always render Leaflet inside a Client Component with:
"use client";
and dynamically import it if needed:
const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });
Why This Matters
✅ Prevents Content Security Policy (CSP) violations

✅ Works offline and loads faster

✅ Removes dependency on 3rd-party CDN availability

Rule added: 2025-08-09