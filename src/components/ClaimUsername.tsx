// ✅ Full code for src/components/ClaimUsername.tsx — Rule1
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { safeFetchJson } from '@/lib/safeJson';

type Status = 'idle' | 'checking' | 'available' | 'unavailable' | 'invalid' | 'error';

export default function ClaimUsername() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const controllerRef = useRef<AbortController | null>(null);

  // 3–30 chars, lowercase letters, numbers, hyphens; must start & end with letter/number
  const isValid = useMemo(
    () => /^[a-z0-9](?:[a-z0-9-]{1,28})[a-z0-9]$/.test(name),
    [name]
  );

  // Debounced availability check
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
        const { data, ok } = await safeFetchJson<{ available: boolean }>(
          `/api/check-username?username=${encodeURIComponent(name)}`,
          { signal: ac.signal, cache: 'no-store' }
        );
        if (!ok || !data) throw new Error('Request failed');
        setStatus(data.available ? 'available' : 'unavailable');
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setStatus('error');
      }
    }, 350);

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
      <label htmlFor="username" className="block text-sm font-medium text-white/90">
        Claim your LocalDealio URL
      </label>
      <div className="mt-2 flex gap-2">
        <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm w-full">
          <span className="text-gray-500">localdealio.com/</span>
          <input
            id="username"
            value={name}
            onChange={(e) => setName(e.target.value.toLowerCase())}
            placeholder="yourname"
            inputMode="text"
            autoComplete="off"
            className="w-full bg-transparent outline-none"
            aria-invalid={status === 'invalid'}
          />
        </div>
        <button
          type="submit"
          disabled={!isValid || status !== 'available'}
          className={`rounded-lg px-4 py-2 font-medium text-white ${
            isValid && status === 'available'
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          aria-disabled={!isValid || status !== 'available'}
        >
          Continue
        </button>
      </div>

      <div className="mt-2 h-6 text-sm">
        {status === 'idle' && <span className="text-white/80">Type a username to check availability.</span>}
        {status === 'checking' && <span className="text-yellow-200">Checking…</span>}
        {status === 'invalid' && <span className="text-red-200">Use 3–30 chars, a–z, 0–9, hyphens. No double hyphens.</span>}
        {status === 'available' && <span className="text-green-200">Available ✓</span>}
        {status === 'unavailable' && <span className="text-red-200">Unavailable ✗</span>}
        {status === 'error' && <span className="text-red-300">Could not check right now. Try again.</span>}
      </div>
    </form>
  );
}
