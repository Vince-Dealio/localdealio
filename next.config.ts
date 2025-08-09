// ✅ Full code for /next.config.ts — tailored CSP for LocalDealio (Stripe + OpenStreetMap)
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// CSP: lock down resources but allow Stripe + OpenStreetMap
const csp = [
  "default-src 'self'",
  // Scripts: allow Stripe + unsafe-inline/eval in dev only
  isProd
    ? "script-src 'self' https://js.stripe.com"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com",
  // Styles: allow inline styles (needed for Tailwind JIT)
  "style-src 'self' 'unsafe-inline'",
  // Images: self, inline data/blobs, OSM tiles
  "img-src 'self' data: blob: https://tile.openstreetmap.org https://*.tile.openstreetmap.org",
  // Fonts: self + inline data
  "font-src 'self' data:",
  // Connections: self, OSM tiles, Stripe
  "connect-src 'self' https://tile.openstreetmap.org https://*.tile.openstreetmap.org https://js.stripe.com https://api.stripe.com",
  // Frames: self + Stripe checkout/hooks
  "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://checkout.stripe.com",
  // Disallow embedding in other sites
  "frame-ancestors 'none'",
  // Allow form submissions to Stripe checkout
  "form-action 'self' https://checkout.stripe.com",
  // Disallow changing base URL
  "base-uri 'self'",
  // Disallow plugins/objects
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  ...(isProd
    ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]
    : []),
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
