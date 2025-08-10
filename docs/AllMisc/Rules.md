// ✅ Full code for docs/AllMisc/Rules.md — replace entire file

# Miscellaneous Rules (LocalDealio)

ID: MISC-CAT  
Status: Active  
Last Updated: 2025-08-10  
Summary: Central page for cross-cutting or uncategorized rules.

---

## MISC-01 — Reserved URL Paths
**Status:** Active  
**Last Updated:** 2025-08-10  
**Summary:** Keep certain paths reserved for framework and app routes to avoid collisions.

**The Rule**
- Reserve routes like `/api/*`, app-level pages, and any framework-required paths.
- Document any newly reserved segments here.

**How to Verify**
- No user content overlaps reserved paths.
- Router behaves predictably across environments.

---

## MISC-02 — Project Naming Conventions
**Status:** Active  
**Last Updated:** 2025-08-10  
**Summary:** Keep names consistent and lowercased where appropriate (packages, folders, routes).

**The Rule**
- Use kebab-case for folder and file names unless framework dictates otherwise.
- Keep brand/product naming consistent across docs and UI.

**How to Verify**
- No mixed naming styles in repo.
- Imports/paths stay stable across OSes.

---

## MISC-03 — UI Consistency Guidelines
**Status:** Active  
**Last Updated:** 2025-08-10  
**Summary:** Maintain consistent spacing, typography, and component usage.

**The Rule**
- Reuse shared components and tokens (spacing, font sizes).
- Avoid one-off styles that drift from the design language.

**How to Verify**
- UI review shows consistent patterns.
- No ad-hoc inline styles for reusable components.

---

## DOMAINS-01 — Redirect `www` to apex (308)
**Status:** Active  
**Last Updated:** 2025-08-10  
**Summary:** All `www.localdeal.io` traffic permanently redirects to `https://localdeal.io` using a **308** redirect. Managed via Namecheap DNS + Vercel domain redirect.

**The Rule**
- **DNS (Namecheap):**  
  - `A  @   76.76.21.21`  
  - `CNAME  www  cname.vercel-dns.com`
- **Vercel (Project → Settings → Domains):**  
  - Add `www.localdeal.io`  
  - Set **Redirect to** `localdeal.io` with **308 Permanent Redirect**  
  - Ensure `localdeal.io` is **Primary**
- Keep this redirect permanent to avoid duplicate content and SSL issues.

**How to Verify**
- `https://www.localdeal.io` → 308 to `https://localdeal.io`  
- DevTools → Network shows first request **308** with `Location: https://localdeal.io/`, then **200** on apex.  
- No certificate warning on `www`.

