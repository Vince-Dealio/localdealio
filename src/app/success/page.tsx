// ✅ Fixed code for app/success/page.tsx

import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="max-w-2xl mx-auto py-20 px-6 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-600">✅ Payment Successful!</h1>
      <p className="mb-6 text-gray-700">
        Thank you for subscribing to digi.site. Your payment was successful and your account is being set up.
      </p>
      <Link href="/" className="text-blue-600 underline">
        ← Return to homepage
      </Link>
    </div>
  );
}
