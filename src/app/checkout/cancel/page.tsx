// ✅ Full code for src/app/checkout/cancel/page.tsx — Rule1
import Link from 'next/link';

export default async function CheckoutCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // keeping consistent with Next.js 15 typing (even if we don't use sp yet)
  await searchParams;

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-red-600">Checkout cancelled</h1>

      <p className="mt-3 text-gray-700">
        Your payment was not completed. You can return to the plans page to try again,
        or contact us if you believe this was a mistake.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/plans"
          className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
          prefetch={false}
        >
          Back to Plans
        </Link>

        <Link
          href="/"
          className="rounded-lg bg-black px-4 py-2 font-medium text-white hover:opacity-90"
          prefetch={false}
        >
          Go to Homepage
        </Link>
      </div>
    </main>
  );
}
