// src/lib/sendVerificationRequest.ts
import { resend } from "./resend";

const BRAND = "LocalDealio";

export async function sendVerificationRequest(params: {
  identifier: string; // recipient email
  url: string;        // magic link
}): Promise<void> {
  const { identifier, url } = params;
  const from = process.env.EMAIL_FROM || "noreply@localdeal.io";

  const { data, error } = await resend.emails.send({
    from,                 // keep as plain address; display name optional later via env
    to: identifier,       // string (matches working digi.site pattern)
    subject: `Sign in to ${BRAND}`,
    html: `<p>Click the link below to sign in:</p><p><a href="${url}">${url}</a></p>`,
    text: `Sign in using this link: ${url}`,
  });

  if (error) {
    console.error("❌ Resend send error:", error);
    throw new Error("Failed to send verification email");
  }
}
