// ✅ Full code for /src/components/TopNav.tsx
// Rule1: replace the current file with this version.

"use client";

import Link from "next/link";
import { useState } from "react";

export default function TopNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.85)]"
        >
          LocalDealio
        </Link>

        {/* Hamburger */}
        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-black/30 hover:bg-black/40 border border-white/20 backdrop-blur text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
        >
          <span className="sr-only">Menu</span>
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            aria-hidden="true"
            className="block"
          >
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Backdrop to close on outside click (sits above the map, below the panel) */}
      {open && (
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-transparent"
        />
      )}

      {/* Compact menu panel (top-right), not full-screen */}
      {open && (
        <nav
          aria-label="Site"
          className="absolute right-4 top-16 z-50 w-64 sm:w-72 rounded-xl bg-white/95 backdrop-blur shadow-2xl ring-1 ring-black/10 overflow-hidden"
        >
          <ul className="divide-y divide-gray-100">
            <li>
              <Link
                href="/search"
                className="block px-4 py-3 text-gray-800 hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                href="/plans"
                className="block px-4 py-3 text-gray-800 hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                Plans
              </Link>
            </li>
            <li>
              <Link
                href="/claim"
                className="block px-4 py-3 text-gray-800 hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                Claim Your Listing
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block px-4 py-3 text-gray-800 hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="block px-4 py-3 text-gray-800 hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                Log in
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
