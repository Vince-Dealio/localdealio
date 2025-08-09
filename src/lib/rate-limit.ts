// ✅ Full code for src/lib/rate-limit.ts
// NOTE: In-memory limiter works per lambda instance; fine for dev/small traffic.
// For production, consider Upstash or Redis-based rate limiting.

type Key = string;

const buckets = new Map<Key, { count: number; resetAt: number }>();

export function rateLimit(opts: {
  key: string;
  limit: number;         // max requests
  windowMs: number;      // per this many ms
}) {
  const now = Date.now();
  const rec = buckets.get(opts.key);
  if (!rec || rec.resetAt < now) {
    buckets.set(opts.key, { count: 1, resetAt: now + opts.windowMs });
    return { allowed: true, remaining: opts.limit - 1, resetAt: now + opts.windowMs };
  }
  if (rec.count >= opts.limit) {
    return { allowed: false, remaining: 0, resetAt: rec.resetAt };
  }
  rec.count += 1;
  return { allowed: true, remaining: opts.limit - rec.count, resetAt: rec.resetAt };
}

export function clientIpFrom(req: Request) {
  // Vercel/Edge: use x-forwarded-for first; otherwise fall back to connection hash
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  // Fallback: per-request unique-ish key
  return req.headers.get("cf-connecting-ip")
    || req.headers.get("x-real-ip")
    || "unknown";
}
