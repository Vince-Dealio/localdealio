// ✅ Full code for src/lib/sendVerificationRequest.ts

import { resend } from "./resend";

export async function sendVerificationRequest(params: {
  identifier: string;
  url: string;
}) {
  const { identifier, url } = params;

  const result = await resend.emails.send({
    from: "digi.site <noreply@digi.site>", // ✅ Using your verified domain
    to: [identifier],
    subject: "Sign in to digi.site",
    html: `<p>Click the link below to sign in:</p><p><a href="${url}">${url}</a></p>`,
  });

  if (result.error) {
    console.error("❌ Error sending email:", result.error);
    throw new Error("Failed to send verification email");
  }
}
