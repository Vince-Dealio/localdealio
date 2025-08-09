// ✅ Full code for src/app/test-session/page.tsx
// Purpose: dev page; do NOT import "resend" here or at module scope.

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default function TestSessionPage() {
  return (
    <main className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-2">Test session</h1>
      <p className="text-gray-600">
        This dev page is intentionally static-safe for production builds. 
        If you need to test email sending, do it via an API route that lazily imports <code>resend</code>.
      </p>
    </main>
  );
}
