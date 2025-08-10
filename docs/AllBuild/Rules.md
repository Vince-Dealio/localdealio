// ✅ Full code for AllBuild/Rules.md — safe to create new file with this content

# Build & Deploy Rules (LocalDealio)

Central page for build and deployment rules.

---

## BUILD-01 — Use `.env.local` for Local Dev (Never Commit Secrets)
**Status:** Active  
**Last Updated:** 2025-08-10  
**Summary:** Keep secrets in `.env.local`; do not commit to Git. Set production env vars in Vercel.

**The Rule**
- Local: `.env.local` (gitignored) for developer machines.
- Prod: configure Environment Variables in Vercel dashboard.

**How to Verify**
- Repo contains no secrets.
- App reads values locally from `.env.local` and in prod from Vercel.

---

## BUILD-02 — No Comments in `package.json`
**Status:** Active  
**Last Updated:** 2025-08-10  
**Summary:** JSON doesn’t support comments; comments may break tooling and builds.

**The Rule**
- Remove any `//` or `/* */` from `package.json`.
- Add notes to README or separate docs instead.

**How to Verify**
- `npm install` and `vercel build` run without JSON parse errors.

---

## BUILD-03 — Keep Vercel Builds Clean (ESLint/TS)
**Status:** Active  
**Last Updated:** 2025-08-10  
**Summary:** Fix lint and type issues locally before pushing to avoid Vercel failures.

**The Rule**
- Run `npm run lint` and `npm run build` locally before pushing.
- Fix `@next/next/no-html-link-for-pages` and any TS errors proactively.

**How to Verify**
- Vercel build logs show 0 blocking errors.
- Site deploys successfully with no ESLint red flags.
