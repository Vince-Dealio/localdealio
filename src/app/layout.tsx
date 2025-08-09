// ✅ Full code for /src/app/layout.tsx — transparent header + TopNav
import type { Metadata, Viewport } from "next";
import "./globals.css";
import TopNav from "@/components/TopNav";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LocalDealio",
  description: "Find and share local deals easily with LocalDealio.",
  applicationName: "LocalDealio",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopNav />
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}
