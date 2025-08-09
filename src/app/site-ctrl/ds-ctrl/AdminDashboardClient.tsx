// ✅ Full code for src/app/site-ctrl/ds-ctrl/AdminDashboardClient.tsx  (CLIENT component)
'use client';

import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

export default function AdminDashboardClient() {
  const sessionHook = useSession();
  const session = sessionHook?.data ?? null;
  const status = sessionHook?.status ?? 'unauthenticated';
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const email = session?.user?.email?.toLowerCase() || '';
    setIsAllowed(email === 'digisitemail@gmail.com');
  }, [session]);

  if (status === 'loading') {
    return <main className="max-w-3xl mx-auto px-4 py-12">Loading…</main>;
  }

  if (!session) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold mb-3">Admin</h1>
        <p className="mb-4 text-gray-600">Please sign in to view the dashboard.</p>
        <button
          onClick={() => signIn()}
          className="rounded-xl bg-black text-white px-4 py-2 hover:bg-gray-800"
        >
          Sign in
        </button>
      </main>
    );
  }

  if (!isAllowed) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold mb-3">Access denied</h1>
        <p className="text-gray-600">This area is restricted.</p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-6">digi.site — Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Admin-only area. This page is forced dynamic to avoid prerender issues with <code>useSession()</code>.
      </p>
      {/* TODO: Fetch and show users via an API route */}
    </main>
  );
}
