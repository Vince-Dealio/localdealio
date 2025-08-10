// ✅ Full code for docs/AllRules/INDEX.md — replace entire file

# All Rules – Index (LocalDealio)

ID: INDEX  
Status: Active  
Last Updated: 2025-08-10  
Summary: Central navigation page for all LocalDealio rules, grouped by category.

---

## Map Rules
- **Category Page:** [MapRules.md](./MapRules.md)
  - MAP-01: Clustering with `react-leaflet-cluster` (Status: Active)
  - MAP-02: React 19 + `--legacy-peer-deps` for Leaflet stack (Status: Active)

---

## Dev & Lint Rules
- **Category Page:** [../../AllDev/Rules.md](../../AllDev/Rules.md)
- DEV-01: Use `<Link>` for internal navigation (Status: Active)
- DEV-02: Remove unused `@ts-expect-error` (Status: Active)
- DEV-03: Valid `inputMode` values only (Status: Active)

---

## Build & Deploy Rules
- **Category Page:** [../../AllBuild/Rules.md](../../AllBuild/Rules.md)
- BUILD-01: `.env.local` usage (Status: Active)
- BUILD-02: No comments in `package.json` (Status: Active)
- BUILD-03: Keep Vercel builds lint/TS clean (Status: Active)

---

## Auth Rules
- **Category Page:** [../../AllAuth/Rules.md](../../AllAuth/Rules.md)
- AUTH-01: Magic Link login flow (Status: Active)
- AUTH-02: Clerk vs NextAuth decision log (Status: Active)

---

## Other / Misc Rules
- **Category Page:** [../../AllMisc/Rules.md](../../AllMisc/Rules.md)
- MISC-01: Reserved URL paths (Status: Active)
- MISC-02: Project naming conventions (Status: Active)
- MISC-03: General UI consistency (Status: Active)
- **DOMAINS-01: Redirect `www` → apex (308)** (Status: Active)

---

## How to Add a New Rule
1. If this is a **map** rule, add it to `MapRules.md` with a new `MAP-XX` ID.
2. Otherwise, add it to the correct category page (`AllDev`, `AllBuild`, `AllAuth`, `AllMisc`).
3. If a rule truly needs its own file, create it under `docs/AllRules` and link it here.

---

## Changelog
- 2025-08-10: Added DOMAINS-01 (www → apex 308) and updated index.
