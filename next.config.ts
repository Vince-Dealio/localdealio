// ✅ Full code for /next.config.ts
// Rule1: replace the current file with this version.

import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/**
 * Content Security Policy
 * - TEMP in prod: allow 'unsafe-inline' for Next.js boot scripts
 * - Allow Stripe + OpenStreetMap assets
 */
const csp = [
  "default-src 'self'",
  // Scripts (Next boot + Stripe)
  isProd
    ? "script-src 'self' 'unsafe-inline' https://js.stripe.com"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com",
  // Styles (Tailwind-inlined)
  "style-src 'self' 'unsafe-inline'",
  // Images (Leaflet tiles + data/blob)
  "img-src 'self' data: blob: https://*.tile.openstreetmap.org https://tile.openstreetmap.org",
  // Fonts
  "font-src 'self' data:",
  // XHR / fetch (Stripe, OSM tiles)
  "connect-src 'self' https://api.stripe.com https://*.tile.openstreetmap.org https://tile.openstreetmap.org",
  // Frames (Stripe)
  "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
  // Workers
  "worker-src 'self' blob:",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Referrer-Policy", value: "no-referrer" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-XSS-Protection", value: "0" },

  // ✅ This is the important fix:
  // Allow the page itself to use Geolocation. (If the app is ever embedded in an iframe,
  // that iframe would also need the "allow='geolocation'" attribute.)
  { key: "Permissions-Policy", value: "geolocation=(self)" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
