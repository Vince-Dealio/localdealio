// ✅ Full code for src/components/ClaimUsername.tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

type Status = 'idle' | 'checking' | 'available' | 'unavailable' | 'invalid' | 'error';

export default function ClaimUsername() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const controllerRef = useRef<AbortController | null>(null);

  // 3–30 chars, lowercase letters, numbers, hyphens; must start & end with letter/number
  const isValid = useMemo(() => /^[a-z0-9](?:[a-z0-9-]{1,28})[a-z0-9]$/.test(name), [name]);

  useEffect(() => {
    if (!name) {
      setStatus('idle');
      return;
    }
    if (!isValid) {
      setStatus('invalid');
      return;
    }

    setStatus('checking');

    controllerRef.current?.abort();
    const ac = new AbortController();
    controllerRef.current = ac;

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/check-username?username=${encodeURIComponent(name)}`, {
          signal: ac.signal,
          cache: 'no-store',
        });
        if (!res.ok) throw new Error('Request failed');
        const data = (await res.json()) as { available: boolean };
        setStatus(data.available ? 'available' : 'unavailable');
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setStatus('error');
      }
    }, 450);

    return () => {
      clearTimeout(timer);
      ac.abort();
    };
  }, [name, isValid]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'available' && isValid) {
      // 🔧 Use `u` (what the claim flow expects)
      router.push(`/claim?u=${encodeURIComponent(name)}`);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-xl rounded-xl bg-white/15 backdrop-blur p-5 md:p-6"
    >
      <label className="block text-white/90 text-sm mb-2">Claim your digi.site link</label>
      <div className="flex items-stretch gap-3">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            digi.site/
          </div>
          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))
            }
            placeholder="yourname"
            className="w-full rounded-md border bg-white/90 pl-[92px] pr-24 py-3 outline-none focus:ring-2 focus:ring-purple-400"
            autoComplete="off"
            inputMode="text"
            aria-label="Desired digi.site username"
          />

          {/* Status pill */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <StatusPill status={status} />
          </div>
        </div>

        <button
          type="submit"
          disabled={status !== 'available'}
          className="rounded-md border px-4 md:px-5 py-3 text-sm font-medium bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-disabled={status !== 'available'}
        >
          {status === 'available' ? 'Continue' : 'Check name'}
        </button>
      </div>
    </form>
  );
}

function StatusPill({ status }: { status: Status }) {
  const base =
    'inline-flex items-center gap-1.5 rounded-full border bg-white/90 px-2.5 py-1 text-xs';
  if (status === 'checking')
    return (
      <span className={base}>
        <Spinner />
        Checking…
      </span>
    );
  if (status === 'available')
    return (
      <span className={base + ' border-green-300'}>
        <CheckIcon />
        <span className="text-green-700">Available</span>
      </span>
    );
  if (status === 'unavailable')
    return (
      <span className={base + ' border-red-300'}>
        <XIcon />
        <span className="text-red-700">Unavailable</span>
      </span>
    );
  if (status === 'invalid')
    return <span className={base + ' border-amber-300 text-amber-700'}>Invalid</span>;
  return <span className={base + ' text-gray-600'}>—</span>;
}

function Spinner() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.25" />
      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" fill="none">
        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.9s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.2 7.3a1 1 0 0 1-1.427.007L3.29 9.52a1 1 0 0 1 1.42-1.41l3.06 3.06 6.49-6.58a1 1 0 0 1 1.444-.3Z" clipRule="evenodd" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" d="M6.28 6.22a.75.75 0 0 1 1.06 0L10 8.88l2.66-2.66a.75.75 0 1 1 1.06 1.06L11.06 10l2.66 2.66a.75.75 0 1 1-1.06 1.06L10 11.06l-2.66 2.66a.75.75 0 0 1-1.06-1.06L8.94 10 6.28 7.34a.75.75 0 0 1 0-1.12Z" clipRule="evenodd" />
    </svg>
  );
}
