// ✅ Full code for src/app/plans/page.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function PlansPage() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const u = (params.get('u') || '').toLowerCase();
    if (u) setUsername(u);
  }, []);

  const plans = [
    { id: 'standard', name: 'Standard', price: '£10/year', features: ['Public profile', 'Links & bio'] },
    { id: 'pro', name: 'Pro', price: '£50/year', features: ['Everything in Standard', 'Products, blog, gallery', 'No ads'] },
  ];

  const handleSubscribe = async (plan: string) => {
    try {
      setLoading(plan);
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, username }),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url; // Stripe hosted checkout
      } else {
        alert('Checkout error.');
      }
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-2">Choose your plan</h1>
      {username && (
        <p className="text-gray-600 mb-8">
          For <span className="font-mono font-semibold">digi.site/{username}</span>
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {plans.map((p) => (
          <div key={p.id} className="rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-2xl font-bold mt-1">{p.price}</p>
            <ul className="mt-4 space-y-1 text-sm text-gray-700">
              {p.features.map((f) => <li key={f}>• {f}</li>)}
            </ul>
            <button
              onClick={() => handleSubscribe(p.id)}
              disabled={loading !== null}
              className="inline-block mt-6 rounded-xl bg-black text-white px-4 py-2 hover:bg-gray-800 disabled:opacity-60"
            >
              {loading === p.id ? 'Redirecting…' : `Continue with ${p.name}`}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link href="/" className="text-sm underline">← Back</Link>
      </div>
    </main>
  );
}
