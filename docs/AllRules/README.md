# AllRules Index

This folder contains all development rules for the LocalDealio (and related) projects.  
Each rule has its own `.md` file with details, reasoning, and usage.

## Rules List

- **Rule1** – Always supply the full page code and Git commands when updating a file, as explained earlier.
- **RuleDev1-LSLint** – In Next.js, never use plain `<a>` for internal navigation. Always use `<Link>` from `next/link` for internal routes; keep `<a>` only for external URLs. This avoids ESLint build failures on Vercel.
- **RuleDev2-PrismaNoUnusedTsExpect** – Never leave unused `@ts-expect-error` in API or server code. If Prisma models exist (e.g., `pendingUser`), remove `@ts-expect-error` lines and type the calls properly.
- **RuleDev3-TSInputMode** – `inputMode` in JSX/TSX must be one of the TypeScript-allowed values: `none`, `text`, `tel`, `url`, `email`, `numeric`, `decimal`, or `search`.
- **RuleDev5-EnvLocal** – Always use `.env.local` for sensitive/local variables; `.env` is for safe defaults only.
- **RuleDev6-NoPackageJsonComments** – Never put comments in `package.json`; JSON does not support comments.

## Usage

- Refer to these rules before making code changes.
- If adding a new rule, create a new `.md` file in this folder and link it here.


---

## 📍 Map Rules Reference

All map-related rules for LocalDealio are documented in:

➡ [AllMaps/MapRules.md](./AllMaps/MapRules.md)

This file includes:
- ✅ Clustering setup using `react-leaflet-cluster`
- ✅ React 19 installation workaround with `--legacy-peer-deps`
- Future map-related rules and best practices

Keep this as the single source of truth for all map feature decisions.


