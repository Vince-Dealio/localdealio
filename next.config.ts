// ✅ Full code for /next.config.ts — safe to replace entire file

import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/**
 * Content Security Policy
 * - TEMP in prod: allow 'unsafe-inline' for Next.js boot scripts
 * - Allows Stripe and OpenStreetMap assets
 */
const csp = [
  "default-src 'self'",
  // Scripts
  // DEV: allow inline + eval for fast refresh
  // PROD: TEMP allow inline so Next can boot; keep Stripe
  isProd
    ? "script-src 'self' 'unsafe-inline' https://js.stripe.com"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com",
  // Styles (Tailwind JIT may inject)
  "style-src 'self' 'unsafe-inline'",
  // Images (incl. OSM tiles, data/blob)
  "img-src 'self' https: data: blob: https://tile.openstreetmap.org https://*.tile.openstreetmap.org",
  // Fonts
  "font-src 'self' data:",
  // XHR/fetch/websockets (Stripe APIs etc.)
  "connect-src 'self' https://api.stripe.com https://r.stripe.com",
  // Frames (Stripe Checkout/Elements/hooks)
  "frame-src https://js.stripe.com https://checkout.stripe.com https://hooks.stripe.com",
  // Workers (in case of map libs or other features)
  "worker-src 'self' blob:",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://checkout.stripe.com",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Only in prod
  ...(isProd ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }] : []),
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
