2. Paste this:

```md
# RuleDev2-SuspenseSearchParams — Always wrap `useSearchParams()` in `<Suspense>`

**Why:** In Next.js 15+, calling `useSearchParams()` directly in a page file during prerender can break the build (especially on Vercel).

## Correct pattern

**`/page.tsx` (server component)**
```tsx
import { Suspense } from "react";
import { SearchResults } from "./SearchResults";

export default function SearchPage() {
return (
 <main>
   <h1>Search Results</h1>
   <Suspense fallback={<p>Loading…</p>}>
     <SearchResults />
   </Suspense>
 </main>
);
}
