// ✅ Full code for /src/components/TopNav.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

export default function TopNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
        >
          LocalDealio
        </Link>

        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="h-10 w-10 inline-flex items-center justify-center rounded-md bg-black/40 hover:bg-black/50 text-white"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <div className="h-0.5 w-5 bg-white" />
            <div className="h-0.5 w-5 bg-white" />
            <div className="h-0.5 w-5 bg-white" />
          </div>
        </button>
      </div>

      {open && (
        <nav className="mx-4 mt-2 rounded-xl bg-white/95 shadow-lg ring-1 ring-black/5 backdrop-blur">
          <ul className="py-2">
            <li>
              <Link href="/create" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>
                Create a Dealio
              </Link>
            </li>
            <li>
              <Link href="/categories" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>
                Choose a Category
              </Link>
            </li>
            <li>
              <Link href="/about" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/login" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>
                Log in
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
