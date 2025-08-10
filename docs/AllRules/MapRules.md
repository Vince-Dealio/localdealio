# MapRules (LocalDealio)

A single, scannable page for all map-related rules and decisions. We’ll append to this as we go.

---

## ✅ RULE-Map1: Clustering
**Status:** Working  
**Lib:** `react-leaflet-cluster`

- All marker clustering in LocalDealio uses **react-leaflet-cluster**.
- Keep this package installed and imported wherever clustering is needed.
- Default config groups nearby markers and expands on click. Re-test clustering whenever we upgrade React, React Leaflet, or this cluster lib.
- If clusters stop expanding, confirm that the markers are children of the cluster component and that map/marker layers mount only on the client.

---

## ✅ RULE-Map2: React 19 + peer-deps workaround
**Status:** Working  
**Purpose:** Avoid compatibility errors between React 19 and React Leaflet packages.

**Install command we use (Windows / any shell):**
```bash
Ctrl + C
npm install leaflet react-leaflet react-leaflet-cluster --legacy-peer-deps


This bypasses strict peerDependencies that conflict with React 19.

Risk: Future React 19 updates may break compatibility until the Leaflet ecosystem updates. If node_modules is reinstalled or React is upgraded, re-run the command above and re-test the map + clusters.