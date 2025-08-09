// ✅ Full code for src/app/claim/page.tsx  (server page + Suspense wrapper per RuleDev2)
import { Suspense } from 'react';
import ClaimEmailForm from '@/components/ClaimEmailForm';

export default function ClaimPage() {
  return (
    <main className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Reserve your link</h1>
      <Suspense fallback={<div className="text-gray-500">Loading…</div>}>
        <ClaimEmailForm />
      </Suspense>
    </main>
  );
}
