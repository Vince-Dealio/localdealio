// ✅ Full code for src/components/ClaimEmailForm.tsx
// Rule1: replace the current file with this version.
//
// What it does
// - Simple email form to start a claim via /api/claim
// - Uses safeFetchJson so empty/invalid JSON never crashes the UI
// - Accessible labels, proper inputMode, and clear status messages
// - No @ts-expect-error, no any, aligns with AllRules

"use client";

import { useState } from "react";
import { safeFetchJson } from "@/lib/safeJson";

type ClaimResponse = {
  ok?: boolean;
  message?: string;
  redirect?: string;
  error?: string;
};

export default function ClaimEmailForm({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setNotice("");

    // Basic email sanity check
    const trimmed = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      const { data, ok, status } = await safeFetchJson<ClaimResponse>("/api/claim", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      if (!ok) {
        setError(`Could not start claim (HTTP ${status}). Please try again.`);
        return;
      }

      // If API gives us a redirect URL, follow it (optional)
      const redirect = data && typeof data.redirect === "string" ? data.redirect : null;
      if (redirect) {
        window.location.href = redirect;
        return;
      }

      const msg =
        (data && (data.message || (data.ok ? "Check your email to continue." : ""))) ||
        "If the address exists, we’ve sent instructions to continue your claim.";
      setNotice(msg);
      setEmail("");
    } catch {
      setError("Network problem. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className={`max-w-md w-full ${className}`} noValidate>
      <label htmlFor="claim-email" className="block text-sm font-medium text-gray-800">
        Your email address
      </label>

      <input
        id="claim-email"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="you@example.com"
      />

      <button
        type="submit"
        disabled={submitting}
        className="mt-3 w-full rounded-lg bg-black text-white py-2 font-medium hover:opacity-90 disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send claim link"}
      </button>

      {/* Status area */}
      <div className="mt-3 min-h-[1.5rem]" aria-live="polite" aria-atomic="true">
        {error && (
          <p className="rounded-md bg-red-50 text-red-800 px-3 py-2 text-sm">
            {error}
          </p>
        )}
        {!error && notice && (
          <p className="rounded-md bg-green-50 text-green-800 px-3 py-2 text-sm">
            {notice}
          </p>
        )}
      </div>

      <p className="mt-2 text-xs text-gray-500">
        We’ll send a secure link to verify ownership.
      </p>
    </form>
  );
}
