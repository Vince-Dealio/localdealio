// ✅ Full code for src/app/checkout/success/page.tsx — Rule1
import Link from 'next/link';

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;

  const planParam = sp?.plan;
  const usernameParam = sp?.username;

  const plan = Array.isArray(planParam) ? planParam[0] : planParam;
  const username = Array.isArray(usernameParam) ? usernameParam[0] : usernameParam;

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Thanks — checkout complete</h1>

      <p className="mt-3 text-gray-700">
        If this were a live Stripe session, you’d see this after a successful payment.
        {plan ? <> Selected plan: <strong>{plan}</strong>.</> : null}
        {username ? <> Username: <strong>{username}</strong>.</> : null}
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

      <p className="mt-8 text-sm text-gray-500">
        Next step: wire `/api/checkout` to create a real Stripe Checkout Session and redirect to it.
      </p>
    </main>
  );
}
