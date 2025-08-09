// ✅ Full code for src/components/ClaimEmailForm.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ClaimEmailForm() {
  const router = useRouter();
  const params = useSearchParams();
  const username = (params.get('u') || '').toLowerCase();
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    if (!username) router.replace('/');
  }, [username, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr('');
    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email }),
      });
      if (!res.ok) {
        const data: { error?: string } = await res.json().catch(() => ({} as { error?: string }));
        throw new Error(data.error || 'Unable to claim');
      }
      router.push(`/plans?u=${encodeURIComponent(username)}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setErr(message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <p className="text-gray-600">You’re claiming: <span className="font-mono font-semibold">digi.site/{username}</span></p>
      <label className="block">
        <span className="text-sm font-medium">Your email</span>
        <input
          type="email"
          required
          className="mt-1 w-full rounded-xl border px-3 py-2"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      {err && <p className="text-sm text-red-600">{err}</p>}

      <button
        type="submit"
        disabled={busy}
        className={`rounded-xl px-4 py-2 font-medium text-white ${busy ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'}`}
      >
        {busy ? 'Reserving…' : 'Continue to plans'}
      </button>
    </form>
  );
}
