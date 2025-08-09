// ✅ /src/app/search/page.tsx
// Server component that wraps the client SearchResults in <Suspense>
// This avoids the Vercel build error when using useSearchParams()
// DO NOT mark this file with "use client"

import { Suspense } from "react";
import { SearchResults } from "./SearchResults";

export default function SearchPage() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Search results</h1>
      <Suspense fallback={<p>Loading…</p>}>
        <SearchResults />
      </Suspense>
    </main>
  );
}
