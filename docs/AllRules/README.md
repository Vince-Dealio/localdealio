// ✅ Full code for docs/AllRules/README.md
# AllRules — Development Rules for digi.site

This folder contains all permanent development rules for the digi.site project.  
These rules are enforced to maintain consistent code quality and avoid common build errors.

---

## Current Rules

- **[Rule1](./Rule1.md)** — Always provide full file replacements with Git commands when updating a file.
- **[RuleDev1-LSLint](./RuleDev1-LSLint.md)** — Use `<Link>` from `next/link` for internal navigation, `<a>` only for external.
- **[RuleDev2-SuspenseSearchParams](./RuleDev2-SuspenseSearchParams.md)** — If using `useSearchParams()` in a page, wrap it in `<Suspense>` and move logic to a client component.
- **[RuleDev3-NoCommentsInJSON](./RuleDev3-NoCommentsInJSON.md)** — No comments allowed inside `.json` files.
- **[RuleDev2-PrismaNoUnusedTsExpect](./RuleDev2-PrismaNoUnusedTsExpect.md)** — No unused `@ts-expect-error` for existing Prisma models.
- **[RuleDev3-TSInputMode](./RuleDev3-TSInputMode.md)** — Only use TypeScript-allowed `inputMode` values (`none | text | tel | url | email | numeric | decimal | search`).
- **[RuleDev4-UseClientInAppPages](./RuleDev4-UseClientInAppPages.md)** — Add `"use client"` at the top of `src/app/*` files that use React hooks or browser APIs.

---

Each rule has its own `.md` file with details and examples.
