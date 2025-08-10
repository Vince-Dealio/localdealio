// ✅ Full code for src/app/plans/page.tsx
// Rule1: replace the current file with this version.
// - Uses safeFetchJson so empty/invalid JSON never crashes the page.
// - Graceful error UI + simple checkout flow.

"use client";

import { useState } from "react";
import { safeFetchJson } from "@/lib/safeJson";
import Link from "next/link";

type CheckoutResponse = { url: string };

const PLANS = [
  { id: "starter", name: "Starter", price: "£0", blurb: "Try it out." },
  { id: "pro", name: "Pro", price: "£19/mo", blurb: "For growing listings." },
  { id: "business", name: "Business", price: "£49/mo", blurb: "Advanced features." },
];

export default function PlansPage() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  async function handleCheckout(planId: string) {
    setError("");
    setLoadingId(planId);
    try {
      const { data, ok, status } = await safeFetchJson<CheckoutResponse>("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      if (!ok) {
        setError(`Checkout failed (HTTP ${status}). Please try again.`);
        return;
      }

      const url = data && typeof (data as any).url === "string" ? (data as any).url : null;
      if (!url) {
        setError("Checkout link unavailable. Please try again in a moment.");
        return;
      }

      window.location.href = url;
    } catch (e) {
      setError("Network problem starting checkout. Please check your connection and try again.");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-white px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Choose a plan</h1>
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 text-red-800 px-4 py-3">
            {error}
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.id} className="rounded-xl border border-gray-200 p-4 shadow-sm bg-white">
              <h2 className="text-xl font-semibold">{p.name}</h2>
              <p className="text-gray-700 mt-1">{p.blurb}</p>
              <div className="text-2xl font-bold mt-4">{p.price}</div>
              <button
                onClick={() => handleCheckout(p.id)}
                disabled={loadingId === p.id}
                className="mt-4 w-full rounded-lg bg-black text-white py-2 hover:opacity-90 disabled:opacity-60"
              >
                {loadingId === p.id ? "Starting checkout…" : "Continue"}
              </button>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-6">
          Have questions? <Link href="/about" className="underline">Contact us</Link>.
        </p>
      </div>
    </main>
  );
}
