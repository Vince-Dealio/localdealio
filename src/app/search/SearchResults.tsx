// ✅ Full code for src/app/search/SearchResults.tsx — Rule1
// Client component with all search logic moved here from the old page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { safeFetchJson } from '@/lib/safeJson';

interface MiniRef {
  id: string;
  name: string;
  slug: string;
}

interface ResultItem {
  id: string;
  name: string;
  slug: string;
  bio?: string | null;
  category?: string | null;
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
    (async () => {
      const { data, ok, status, text } = await safeFetchJson<ResultItem[]>(`/api/search?${qs}`);
      if (!ok || !data) {
        setError(`HTTP ${status}${text ? ` — ${text}` : ''}`);
      } else {
        setResults(data);
      }
      setLoading(false);
    })();
  }, [qs]);

  return (
    <>
      <p className="text-gray-600 mb-6">
        {qs ? `Filters: ${qs}` : 'No filters applied.'}
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
                href={`/listing/${r.slug}`}
                className="block rounded-xl border border-gray-200 p-4 hover:bg-gray-50"
                prefetch={false}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{r.name}</h3>
                  <span className="text-xs text-gray-500">{r.city}, {r.region}, {r.country}</span>
                </div>

                {(r.categories?.length || r.tags?.length) ? (
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-700">
                    {r.categories?.map(c => (
                      <span key={`c-${c.id}`} className="rounded bg-gray-100 px-2 py-1">{c.name}</span>
                    ))}
                    {r.tags?.map(t => (
                      <span key={`t-${t.id}`} className="rounded bg-gray-100 px-2 py-1">#{t.slug}</span>
                    ))}
                  </div>
                ) : null}

                {r.bio && <p className="mt-3 text-gray-800">{r.bio}</p>}
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default SearchResults;
