# All Rules – Index (LocalDealio)

Single, scannable index of all rules. Use this page to navigate.

---

## Map Rules
- **Category Page:** [AllMaps/MapRules.md](../../AllMaps/MapRules.md)
  - MAP-01: Clustering with `react-leaflet-cluster` (Status: Active)
  - MAP-02: React 19 + `--legacy-peer-deps` for Leaflet stack (Status: Active)

---

## Dev & Lint Rules
- DEV-01: Use `<Link>` (not `<a>`) for internal Next.js routes (Status: Active)
- DEV-02: Remove unused `@ts-expect-error` (Status: Active)
- DEV-03: Valid `inputMode` values only (`text`, `email`, `search`, etc.) (Status: Active)

---

## Build & Deploy
- BUILD-01: Use `.env.local` for local dev; never commit secrets (Status: Active)
- BUILD-02: Avoid comments in `package.json` to prevent tooling breakage (Status: Active)

---

## Auth & Security
- SEC-01: Email magic-link or credentials must use secure flows; no secrets in logs (Status: Active)

---

## How to Add a New Rule
1. If this is a **map** rule, add it to `AllMaps/MapRules.md` with a new `MAP-XX` ID.
2. Otherwise, create or update a file in `docs/AllRules`, and add a link here.
3. Use the template: [`RULES_TEMPLATE.md`](./RULES_TEMPLATE.md)

---

## Changelog
- 2025-08-10: Added central index and registered MAP rules + key Dev/Build rules.
