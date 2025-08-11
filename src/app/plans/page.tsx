// ✅ Full code for src/app/plans/page.tsx — Rule1
'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';

type PlanId = 'standard' | 'pro';

type Plan = {
  id: PlanId;
  name: string;
  priceMonthly: number; // in your display currency
  blurb: string;
  features: string[];
  cta: string;
};

const PLANS: Plan[] = [
  {
    id: 'standard',
    name: 'Standard',
    priceMonthly: 9,
    blurb: 'Great for getting started with LocalDealio.',
    features: [
      'Public profile listing',
      'Add basic details & links',
      'Map pin with clustering',
      'Email support',
    ],
    cta: 'Choose Standard',
  },
  {
    id: 'pro',
    name: 'Pro',
    priceMonthly: 19,
    blurb: 'For growing teams that want more reach.',
    features: [
      'Everything in Standard',
      'Priority placement boost',
      'Photo gallery',
      'Priority support',
    ],
    cta: 'Choose Pro',
  },
];

export default function PlansPage() {
  // state kept minimal; fully typed, no `any`
  const [selected, setSelected] = useState<PlanId>('standard');

  const selectedPlan = useMemo(
    () => PLANS.find((p) => p.id === selected) ?? PLANS[0],
    [selected]
  );

  // No unused event params; no `any`
  const onSelect = (planId: PlanId) => {
    setSelected(planId);
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Choose your plan</h1>
        <p className="mt-2 text-gray-600">
          Pick the plan that fits. You can upgrade anytime.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {PLANS.map((plan) => {
          const active = plan.id === selected;
          return (
            <article
              key={plan.id}
              className={`rounded-2xl border p-6 shadow-sm transition ${
                active ? 'border-black' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{plan.name}</h2>
                <button
                  type="button"
                  onClick={() => onSelect(plan.id)}
                  className={`rounded-full px-3 py-1 text-sm ${
                    active
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-pressed={active}
                >
                  {active ? 'Selected' : 'Select'}
                </button>
              </div>

              <p className="mt-2 text-gray-700">{plan.blurb}</p>

              <div className="mt-4">
                <span className="text-4xl font-bold">£{plan.priceMonthly}</span>
                <span className="ml-1 text-gray-600">/month</span>
              </div>

              <ul className="mt-4 list-disc space-y-1 pl-6 text-gray-700">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              {/* RuleDev1-LSLint: internal nav uses Link, not <a> */}
              <Link
                href={`/checkout?plan=${plan.id}`}
                className="mt-6 inline-block w-full rounded-xl bg-black px-4 py-3 text-center font-medium text-white hover:opacity-90"
                prefetch={false}
              >
                {plan.cta}
              </Link>
            </article>
          );
        })}
      </section>

      <aside className="mx-auto mt-8 max-w-2xl rounded-xl bg-gray-50 p-4 text-sm text-gray-700">
        After payment, you’ll be redirected to your dashboard to set up your listing.
      </aside>

      {/* Helpful summary of the currently selected plan (purely UI) */}
      <section className="mx-auto mt-10 max-w-2xl rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold">Selected plan</h3>
        <p className="mt-1 text-gray-700">
          <strong>{selectedPlan.name}</strong> — £{selectedPlan.priceMonthly}/month
        </p>
      </section>
    </main>
  );
}
