// src/lib/sendVerificationRequest.ts
import { resend } from "./resend";

const BRAND = "LocalDealio";

export async function sendVerificationRequest(params: {
  identifier: string;
  url: string;
}) {
  const { identifier, url } = params;
  const from = process.env.EMAIL_FROM || "noreply@localdeal.io";

  const result = await resend.emails.send({
    from,                 // plain address preferred; display name optional later
    to: [identifier],
    subject: `Sign in to ${BRAND}`,
    html: `<p>Click the link below to sign in:</p><p><a href="${url}">${url}</a></p>`,
    text: `Sign in using this link: ${url}`,
  });

  if ((result as any)?.error) {
    console.error("❌ Resend send error:", (result as any).error);
    throw new Error("Failed to send verification email");
  }
}
