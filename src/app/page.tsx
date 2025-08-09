// ✅ Full code for /src/app/page.tsx — LocalDealio homepage
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
      {/* Hero */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Find & share local deals with <span className="text-gray-900">LocalDealio</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A simple way for neighborhoods and small businesses to highlight discounts,
          flash sales, and special offers — all in one place.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium hover:bg-gray-100"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-xl bg-black text-white px-5 py-2.5 text-sm font-medium hover:opacity-90"
          >
            Create an account
          </Link>
        </div>
      </section>

      {/* Placeholder “how it works” */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border p-6">
          <h3 className="font-semibold mb-2">1. Post a deal</h3>
          <p className="text-sm text-gray-600">
            Share your offer, hours, and location. It takes just a minute.
          </p>
        </div>
        <div className="rounded-2xl border p-6">
          <h3 className="font-semibold mb-2">2. Get discovered</h3>
          <p className="text-sm text-gray-600">
            Locals nearby see your deal on the feed and map.
          </p>
        </div>
        <div className="rounded-2xl border p-6">
          <h3 className="font-semibold mb-2">3. Track interest</h3>
          <p className="text-sm text-gray-600">
            Simple analytics show views and saves (coming soon).
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Ready to share your first deal?</h2>
        <p className="text-gray-600 mb-4">It’s free to start. Upgrade anytime.</p>
        <Link
          href="/signup"
          className="inline-flex items-center justify-center rounded-xl bg-black text-white px-6 py-3 text-sm font-medium hover:opacity-90"
        >
          Get started
        </Link>
      </section>
    </div>
  );
}
