// ✅ Full code for src/app/api/auth/[...nextauth]/route.ts
// Rule1: delete the current file and replace with this version.

import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

// Ensure this route is always dynamic and runs on Node.js (so env vars are available)
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function brand() {
  return {
    name: "digi.site",
    from: process.env.RESEND_FROM || "digi.site <noreply@digi.site>",
    subject: "Sign in to digi.site",
  };
}

function emailHtml(url: string) {
  return `
  <div style="font-family:Arial,sans-serif;line-height:1.5">
    <h2 style="margin:0 0 12px">Sign in to <span style="color:#555">digi.site</span></h2>
    <p>Click the button below to finish signing in:</p>
    <p>
      <a href="${url}" style="display:inline-block;padding:10px 16px;background:#000;color:#fff;text-decoration:none;border-radius:10px">
        Sign in
      </a>
    </p>
    <p style="color:#666;font-size:12px">If the button doesn't work, copy and paste this link:</p>
    <p style="word-break:break-all;font-size:12px;color:#444">${url}</p>
  </div>`;
}

function emailText(url: string) {
  return `Sign in to digi.site\n\n${url}\n\n`;
}

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    EmailProvider({
      // Do NOT construct Resend at the top level. Do it here lazily.
      async sendVerificationRequest({ identifier, url }) {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
          // During build this was crashing. Now we just log and no-op, preventing build failure.
          console.warn("[NextAuth] RESEND_API_KEY not set; skipping email send at build/runtime.");
          return;
        }
        const { Resend } = await import("resend");
        const resend = new Resend(apiKey);

        const meta = brand();
        await resend.emails.send({
          from: meta.from,
          to: identifier,
          subject: meta.subject,
          html: emailHtml(url),
          text: emailText(url),
        });
      },
      // 24h to use the link
      maxAge: 24 * 60 * 60,
    }),
  ],
  pages: {
    verifyRequest: "/verify-email", // Your existing page
  },
});

export { handler as GET, handler as POST };
