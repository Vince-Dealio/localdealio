// ✅ Full code for src/app/page.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "available" | "unavailable">("idle");

  useEffect(() => {
    if (!username.trim()) {
      setStatus("idle");
      return;
    }

    const check = setTimeout(async () => {
      setStatus("checking");
      try {
        const res = await fetch(`/api/check-username?username=${encodeURIComponent(username)}`);
        const data = await res.json();
        if (res.ok && data.available) {
          setStatus("available");
        } else {
          setStatus("unavailable");
        }
      } catch {
        setStatus("unavailable");
      }
    }, 400);

    return () => clearTimeout(check);
  }, [username]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "available") {
      // 🔧 Use `u` (what the downstream flow reads)
      router.push(`/claim?u=${encodeURIComponent(username)}`);
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-900 hover:opacity-80">
            digi.site
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Log in
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-20">
        <section className="relative">
          <div className="bg-gradient-to-r from-indigo-700 to-purple-600">
            <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
              <h1 className="text-white text-3xl md:text-4xl font-bold text-center">
                Claim your unique digi.site
              </h1>

              <div className="mt-8 flex justify-center">
                <form
                  onSubmit={handleSubmit}
                  className="w-full max-w-xl rounded-xl bg-white/15 backdrop-blur p-5 md:p-6"
                >
                  <label className="block text-white/90 text-sm mb-2">Claim your digi.site link</label>
                  <div className="flex items-stretch gap-3">
                    <div className="relative flex-1">
                      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        digi.site/
                      </div>
                      <input
                        placeholder="yourname"
                        className="w-full rounded-md border bg-white/90 pl-[92px] pr-24 py-3 outline-none focus:ring-2 focus:ring-purple-400"
                        autoComplete="off"
                        inputMode="text"
                        aria-label="Desired digi.site username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        {status === "available" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border bg-white/90 px-2.5 py-1 text-xs text-green-600">
                            ✅ Available
                          </span>
                        )}
                        {status === "unavailable" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border bg-white/90 px-2.5 py-1 text-xs text-red-600">
                            ❌ Unavailable
                          </span>
                        )}
                        {status === "checking" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border bg-white/90 px-2.5 py-1 text-xs text-gray-600">
                            Checking...
                          </span>
                        )}
                        {status === "idle" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border bg-white/90 px-2.5 py-1 text-xs text-gray-600">
                            —
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="rounded-md border px-4 md:px-5 py-3 text-sm font-medium bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={status !== "available"}
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mx-auto max-w-3xl px-4 py-10 text-center">
          <h2 className="text-lg font-semibold">One link. One page. Endless possibilities.</h2>
          <p className="text-gray-600 mt-3">
            digi.site lets you create a simple, elegant page for your business, brand, or project. Showcase products,
            reviews, and more — all in one place.
          </p>
        </section>

        {/* Newest Pages */}
        <section className="mx-auto max-w-6xl px-4 pb-14">
          <h3 className="text-center font-semibold mb-6">Newest digi.site pages</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link className="rounded-xl border p-5 hover:shadow-sm transition" href="/sunshinecafe">
              <div className="font-medium">digi.site/sunshinecafe</div>
              <div className="text-sm text-gray-600 mt-1">Click to view</div>
            </Link>
            <Link className="rounded-xl border p-5 hover:shadow-sm transition" href="/greengarden">
              <div className="font-medium">digi.site/greengarden</div>
              <div className="text-sm text-gray-600 mt-1">Click to view</div>
            </Link>
            <Link className="rounded-xl border p-5 hover:shadow-sm transition" href="/artbyamy">
              <div className="font-medium">digi.site/artbyamy</div>
              <div className="text-sm text-gray-600 mt-1">Click to view</div>
            </Link>
            <Link className="rounded-xl border p-5 hover:shadow-sm transition" href="/fixitfast">
              <div className="font-medium">digi.site/fixitfast</div>
              <div className="text-sm text-gray-600 mt-1">Click to view</div>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto border-t">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600 flex items-center justify-between">
            <div>© {new Date().getFullYear()} digi.site</div>
            <nav className="flex gap-4">
              <Link className="hover:underline" href="/privacy">
                Privacy
              </Link>
              <Link className="hover:underline" href="/terms">
                Terms
              </Link>
              <Link className="hover:underline" href="/contact">
                Contact
              </Link>
            </nav>
          </div>
        </footer>
      </main>
    </main>
  );
}
