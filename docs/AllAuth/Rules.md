# AllAuth Rules

_Last updated: 2025-08-10_

This file is the single source of truth for authentication in LocalDealio.

---

## Index
- [AUTH-01 — Environments & Secrets](#auth-01--environments--secrets)
- [AUTH-02 — NextAuth Structure & Runtime](#auth-02--nextauth-structure--runtime)
- [AUTH-03 — Email Magic Link (NextAuth + Prisma + Resend + Neon)](#auth-03--email-magic-link-nextauth--prisma--resend--neon)
- [Troubleshooting Quicklist](#troubleshooting-quicklist)

---

## AUTH-01 — Environments & Secrets
**Status:** Active

- Local dev uses **`.env.local`** (never committed).  
- Production secrets live in **Vercel → Project → Environment Variables**.
- Required vars:
  - `NEXTAUTH_URL = https://localdeal.io`
  - `NEXTAUTH_SECRET = <long random hex>`
  - `RESEND_API_KEY = re_...`
  - `EMAIL_FROM = noreply@localdeal.io` _(plain address; optional display name later)_
  - `DATABASE_URL = <Neon pooled URL with sslmode=require>`
  - _(temp only)_ `NEXTAUTH_DEBUG = true`
- Rotations:
  - Changing `NEXTAUTH_SECRET` invalidates existing sessions (expected).

---

## AUTH-02 — NextAuth Structure & Runtime
**Status:** Active

- **Config lives in one place:** `src/lib/auth/options.ts` (no per-route duplication).
- **Route wrapper:** `src/app/api/auth/[...nextauth]/route.ts` only imports and exposes the handler.
  ```ts
  import NextAuth from "next-auth";
  import { authOptions } from "@/lib/auth/options";
  export const dynamic = "force-dynamic";
  export const runtime = "nodejs";
  const handler = NextAuth(authOptions);
  export { handler as GET, handler as POST };


Adapter: PrismaAdapter(prisma) is required (NextAuth stores verification tokens).

Session strategy: JWT (current default in options).

