// ✅ Full code for src/app/site-ctrl/ds-ctrl/page.tsx — ESLint-safe internal link
'use client';

export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function AdminDashboardPage() {
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
        <Link
          href="/api/auth/signin"
          className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
        >
          Log in
        </Link>
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
