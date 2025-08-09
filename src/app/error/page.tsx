// ✅ Full code for src/app/error/page.tsx
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-16 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-4 text-gray-600">
        An unexpected error occurred. Please try again in a moment.
      </p>

      <div className="mt-8 flex gap-3 justify-center">
        <Link
          href="/"
          className="inline-block rounded-lg border px-5 py-3 hover:bg-gray-50 transition"
        >
          ← Back to homepage
        </Link>
        <Link
          href="/login"
          className="inline-block rounded-lg border px-5 py-3 hover:bg-gray-50 transition"
        >
          Go to login
        </Link>
      </div>
    </div>
  );
}
