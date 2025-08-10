// ✅ Full code for src/lib/safeJson.ts
// Safe JSON helpers that never throw on empty/invalid JSON.

export type SafeJsonResult<T> = {
  data: T | null;
  ok: boolean;
  status: number;
  headers: Headers;
};

export async function safeJson<T = unknown>(res: Response): Promise<SafeJsonResult<T>> {
  const text = await res.text();
  let data: T | null = null;
  if (text) {
    try {
      data = JSON.parse(text) as T;
    } catch {
      data = null;
    }
  }
  return { data, ok: res.ok, status: res.status, headers: res.headers };
}

export async function safeFetchJson<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<SafeJsonResult<T>> {
  const res = await fetch(input, init);
  return safeJson<T>(res);
}
