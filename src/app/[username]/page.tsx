// ✅ Full code for src/app/[username]/page.tsx (async + correct Next 15 params typing)
import Link from "next/link";

export default async function UsernamePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username: raw } = await params;
  const username = (raw || "").toLowerCase();

  // Guard for obviously reserved paths; real enforcement also happens in APIs.
  const RESERVED = new Set([
    "api","signin","login","plans","claim","site-ctrl","dashboard","success","cancel",
    "_next","favicon.ico","verify-email","static","assets"
  ]);

  if (RESERVED.has(username)) {
    // Allow Next to route to the actual static route if it exists
    return null;
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">@{username}</h1>
      <p className="mt-4 text-lg">
        This profile isn’t set up yet. If this is your business, you can claim it.
      </p>
      <div className="mt-6">
        <Link
          className="inline-block rounded-xl px-5 py-3 border hover:bg-gray-50 transition"
          href="/plans"
        >
          See plans & claim this name
        </Link>
      </div>

      <p className="mt-10 text-sm text-gray-500">
        (Temporary placeholder page – will be replaced by the real profile view.)
      </p>
    </main>
  );
}
