// ✅ Full code for src/app/verify-email/page.tsx

import Link from 'next/link'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-900">Verify Your Email</h1>
        <p className="text-gray-700 text-center">
          We&apos;ve sent a sign-in link to your email address.
        </p>
        <p className="text-gray-700 text-center">
          Please click the link in that email to complete your LocalDealio sign-in.
        </p>
        <p className="text-gray-600 text-center text-sm mt-4">
          Didn&apos;t get the email? Be sure to check your spam folder, or try again in a minute.
        </p>
        <div className="flex justify-center">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
