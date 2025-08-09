// ✅ Full code for src/app/cancel/page.tsx
import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-16 text-center">
      <h1 className="text-3xl font-bold">Checkout canceled</h1>
      <p className="mt-4 text-gray-600">
        No charge was made. You can choose a plan again at any time.
      </p>

      <div className="mt-8">
        <Link
          href="/plans"
          className="inline-block rounded-lg border px-5 py-3 hover:bg-gray-50 transition"
        >
          ← Back to Plans
        </Link>
      </div>
    </div>
  );
}
