// ✅ Full code for docs/AllRules/MapRules.md — safe to delete file content and replace entirely

# MapRules (LocalDealio)

A single, scannable page for all map-related rules and decisions. We’ll append to this as we go.

---

## ✅ MAP-01 — Clustering
**Status:** Active  
**Last Updated:** 2025-08-10  
**Library:** `react-leaflet-cluster`  

**Summary:** All marker clustering in LocalDealio uses `react-leaflet-cluster`.

**The Rule**
- Keep this package installed and imported wherever clustering is needed.
- Default config groups nearby markers and expands on click.
- Re-test clustering whenever React, React Leaflet, or `react-leaflet-cluster` is upgraded.
- If clusters stop expanding, confirm markers are children of the cluster component and that layers mount only on the client.

**How to Verify**
- Launch the map page.
- Zoom out and verify markers cluster.
- Click cluster → markers should expand to individual points.

---

## ✅ MAP-02 — React 19 + peer-deps workaround
**Status:** Active  
**Last Updated:** 2025-08-10  
**Purpose:** Avoid compatibility errors between React 19 and the Leaflet ecosystem.

**Install command (Windows / any shell):**
```bash
Ctrl + C
npm install leaflet react-leaflet react-leaflet-cluster --legacy-peer-deps

The Rule

This bypasses strict peerDependencies that conflict with React 19.

Risk: Future React 19 updates may break compatibility until the Leaflet ecosystem updates.

If node_modules is reinstalled or React is upgraded, re-run the command above and re-test the map + clusters.

How to Verify

npm run dev starts without dependency warnings for React Leaflet.

Map loads and markers render clustered.

Notes / To Add Next
When we add new map features (custom icons, popups, server-side data loading, heatmaps, etc.), we’ll append new MAP-XX items here.

Keep this file as the single source of truth for map-related decisions.