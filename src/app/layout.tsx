// ✅ Full code for /src/app/layout.tsx — move viewport out of metadata
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "digi.site",
  description: "Claim your unique digi.site page today",
  applicationName: "digi.site",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

// ✅ Correct place for viewport in Next 15+
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Header (site-wide) */}
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

        {/* Page content offset */}
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
