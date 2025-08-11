// ✅ Full code for src/lib/safeJson.ts — Rule1
// Safe JSON helpers that never throw on empty/invalid JSON, plus a thin fetch wrapper.
// Non-breaking: keeps existing exports and adds small utilities.

export type SafeJsonResult<T> = {
data: T | null;
ok: boolean;
status: number;
headers: Headers;
// raw text in case caller needs to inspect non-JSON bodies
text?: string;
};

/**

Safely read and parse a Response as JSON.

Returns { data: null } if body is empty or invalid JSON

Preserves ok/status/headers
*/
export async function safeJson<T = unknown>(res: Response): Promise<SafeJsonResult<T>> {
// Fast-path: no content (204/205/HEAD or missing Content-Length)
const contentLength = res.headers.get("content-length");
if (res.status === 204 || res.status === 205 || res.status === 304 || contentLength === "0") {
return { data: null, ok: res.ok, status: res.status, headers: res.headers, text: "" };
}

const ct = res.headers.get("content-type") || "";
const isJson = ct.toLowerCase().includes("application/json");

// Read the body once
const text = await res.text();
if (!text) {
return { data: null, ok: res.ok, status: res.status, headers: res.headers, text };
}

if (!isJson) {
// Not JSON? return null data but include raw text
return { data: null, ok: res.ok, status: res.status, headers: res.headers, text };
}

try {
const data = JSON.parse(text) as T;
return { data, ok: res.ok, status: res.status, headers: res.headers, text };
} catch {
return { data: null, ok: res.ok, status: res.status, headers: res.headers, text };
}
}

/**

Fetch + safeJson in one call.
*/
export async function safeFetchJson<T = unknown>(
input: RequestInfo | URL,
init?: RequestInit,
): Promise<SafeJsonResult<T>> {
const res = await fetch(input, init);
return safeJson<T>(res);
}

/**

Parse JSON from a string safely, with a typed fallback.
*/
export function safeJsonParse<T>(value: string, fallback: T): T {
try {
return JSON.parse(value) as T;
} catch {
return fallback;
}
}

/**

Stringify JSON safely, returning a fallback on error.
*/
export function safeJsonStringify(value: unknown, fallback = ""): string {
try {
return JSON.stringify(value);
} catch {
return fallback;
}
}