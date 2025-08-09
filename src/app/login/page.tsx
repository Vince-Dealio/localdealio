// ✅ Full code for src/app/login/page.tsx

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    await signIn("email", {
      email,
      callbackUrl: "/",
    });

    setStatus("sent");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 bg-white p-6 shadow-md rounded-xl"
      >
        <h1 className="text-2xl font-semibold text-center">Sign in to digi.site</h1>

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full border px-4 py-2 rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
        >
          {status === "loading" ? "Sending..." : "Send login link"}
        </button>

        {status === "sent" && (
          <p className="text-green-600 text-sm text-center">
            📩 If your email is valid, a login link has been sent.
          </p>
        )}
      </form>
    </div>
  );
}
