// ✅ Full code for docs/AllRules/INDEX.md — safe to delete file and replace entirely

# All Rules – Index (LocalDealio)

Single, scannable index of all rules. Use this page to navigate.

---

## Map Rules
- **Category Page:** [AllMaps/MapRules.md](../../AllMaps/MapRules.md)
  - MAP-01: Clustering with `react-leaflet-cluster` (Status: Active)
  - MAP-02: React 19 + `--legacy-peer-deps` for Leaflet stack (Status: Active)

---

## Dev & Lint Rules
- [DEV-01: RuleDev1-LSLint – Use `<Link>` for internal navigation](./RuleDev1-LSLint.md) (Status: Active)
- [DEV-02: RuleDev2-TSExpectError – Remove unused `@ts-expect-error`](./RuleDev2-TSExpectError.md) (Status: Active)
- [DEV-03: RuleDev3-InputMode – Valid `inputMode` values only](./RuleDev3-InputMode.md) (Status: Active)

---

## Build & Deploy Rules
- [BUILD-01: .env.local Usage](./EnvLocalUsage.md) (Status: Active)
- [BUILD-02: No comment lines in package.json](./NoCommentInPackageJSON.md) (Status: Active)
- [BUILD-03: Keep Vercel builds clean of ESLint errors](./VercelBuildClean.md) (Status: Active)

---

## Auth & Security Rules
- [SEC-01: Magic Link Login Flow](./MagicLinkLoginFlow.md) (Status: Active)
- [SEC-02: Clerk vs NextAuth decision log](./ClerkVsNextAuth.md) (Status: Active)

---

## Other / Misc Rules
- [MISC-01: Reserved URL paths](./ReservedPaths.md) (Status: Active)
- [MISC-02: Project naming conventions](./ProjectNaming.md) (Status: Active)
- [MISC-03: General UI consistency](./UIConsistency.md) (Status: Active)

---

## How to Add a New Rule
1. If this is a **map** rule, add it to `AllMaps/MapRules.md` with a new `MAP-XX` ID.
2. Otherwise, create or update a file in `docs/AllRules`, and add a link here under the correct category.
3. Use the template: [`RULES_TEMPLATE.md`](./RULES_TEMPLATE.md)

---

## Changelog
- 2025-08-10: Added central index, grouped all existing rules by category, linked MapRules category page.
