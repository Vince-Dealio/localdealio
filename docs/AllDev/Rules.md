// ✅ Full code for AllDev/Rules.md — safe to create new file with this content

# Dev Rules (LocalDealio)

Central page for development & lint rules.

---

## DEV-01 — Internal Links Must Use `<Link>`
**Status:** Active  
**Last Updated:** 2025-08-10  
**Summary:** In Next.js, use `<Link>` from `next/link` for internal routes; use `<a>` only for external URLs.

**The Rule**
- Replace any `<a href="/some-internal-path">` with `<Link href="/some-internal-path">`.
- Keeps ESLint and Vercel builds clean; enables client-side navigation.

**How to Verify**
- ESLint shows no `@next/next/no-html-link-for-pages` warnings.
- Internal links navigate without a full page reload.

---

## DEV-02 — No Unused `@ts-expect-error`
**Status:** Active  
**Last Updated:** 2025-08-10  
**Summary:** Don’t leave unused `@ts-expect-error` in API/server code. Type Prisma calls correctly.

**The Rule**
- Remove stray/unused `@ts-expect-error`.
- When Prisma models exist (e.g., `pendingUser`), import and type the calls properly.

**How to Verify**
- `npm run build` passes without TypeScript suppression warnings.
- Code compiles with strict typing.

---

## DEV-03 — Valid `inputMode` Values Only
**Status:** Active  
**Last Updated:** 2025-08-10  
**Summary:** React/TS accepts only: `none | text | tel | url | email | numeric | decimal | search`.

**The Rule**
- Never use unsupported values (e.g., `latin`).
- Default to `inputMode="text"` when unsure.

**How to Verify**
- TypeScript no longer reports prop type errors for inputs.
