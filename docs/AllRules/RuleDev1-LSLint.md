2. Paste this:

```md
# RuleDev1-LSLint — Next.js internal links must use `<Link>`

**Why:** Next.js ESLint rule `@next/next/no-html-link-for-pages` fails Vercel builds if internal navigation uses `<a>`. `<Link>` enables client-side routing & prefetch.

## Do
```tsx
import Link from "next/link";
<Link href="/claim" className="btn">Claim</Link>
<Link href="/login" className="link">Login</Link>
<Link href={`/${profile.username}`}>View profile</Link>
