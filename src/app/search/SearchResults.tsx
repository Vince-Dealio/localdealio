// ✅ /src/app/search/SearchResults.tsx
// Client component with all search logic moved here from the old page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface MiniRef {
  id: string;
  name: string;
  slug: string;
}

interface ResultItem {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  website: string;
  country: string;
  region: string;
  city: string;
  latitude?: number | null;
  longitude?: number | null;
  categories: MiniRef[];
  tags: MiniRef[];
  url: string;
}

export function SearchResults() {
  const sp = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Build query string from params
  const qs = (() => {
    const params = new URLSearchParams();
    const keys = ['category', 'country', 'region', 'city', 'tags', 'q'];
    keys.forEach((k) => {
      const v = sp.get(k);
      if (v) params.set(k, v);
    });
    return params.toString();
  })();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/search?${qs}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: ResultItem[]) => setResults(data))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [qs]);

  return (
    <>
      <p className="text-gray-600 mb-6">
        {qs ? `Filters: ${qs}` : 'No filters applied'}
      </p>

      {loading && <p>Loading…</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <>
          <p className="mb-4 font-medium">
            {results.length} result{results.length === 1 ? '' : 's'}
          </p>

          <div className="grid gap-4">
            {results.map((r) => (
              <Link
                key={r.id}
                href={r.url}
                className="block rounded border border-gray-200 hover:border-gray-300 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">{r.displayName}</h2>
                    <p className="text-sm text-gray-600">@{r.username}</p>
                    {(r.country || r.region || r.city) && (
                      <p className="text-sm text-gray-700 mt-1">
                        {[r.city, r.region, r.country]
                          .filter(Boolean)
                          .join(', ')}
                      </p>
                    )}
                  </div>
                  {r.website && (
                    <span className="text-sm text-blue-600 underline">
                      {new URL(r.website).hostname.replace(/^www\./, '')}
                    </span>
                  )}
                </div>

                {r.categories.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {r.categories.map((c) => (
                      <span
                        key={c.id}
                        className="px-2 py-0.5 text-xs rounded-full bg-gray-100 border"
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                )}

                {r.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {r.tags.map((t) => (
                      <span
                        key={t.id}
                        className="px-2 py-0.5 text-xs rounded-full bg-green-50 border border-green-200"
                      >
                        #{t.slug}
                      </span>
                    ))}
                  </div>
                )}

                {r.bio && <p className="mt-3 text-gray-800">{r.bio}</p>}
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
