// ✅ Full code for src/lib/validation.ts
import { z, ZodTypeAny } from "zod";

export type ParsedResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; message: string };

export async function parseJson<T extends ZodTypeAny>(
  req: Request,
  schema: T
): Promise<ParsedResult<z.infer<T>>> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return { ok: false, status: 400, message: "Invalid JSON body" };
  }

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    // Zod v3: use `error.issues` (NOT `error.errors`)
    const msg = parsed.error.issues.map((i) => i.message).join("; ");
    return { ok: false, status: 400, message: msg || "Invalid request" };
  }

  return { ok: true, data: parsed.data };
}

export function normalizeUsername(input: string) {
  const v = (input || "").trim().toLowerCase();
  return v;
}

export function isUsernameValid(username: string) {
  // Letters, numbers, hyphen; 3–30 chars; no leading/trailing hyphen, no double hyphens
  if (username.length < 3 || username.length > 30) return false;
  if (!/^[a-z0-9-]+$/.test(username)) return false;
  if (username.startsWith("-") || username.endsWith("-")) return false;
  if (username.includes("--")) return false;
  return true;
}
