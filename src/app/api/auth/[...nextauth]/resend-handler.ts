// ✅ Full code for src/app/api/auth/[...nextauth]/resend-handler.ts

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationRequest({ identifier, url }: { identifier: string; url: string }) {
  try {
    await resend.emails.send({
      from: "digi.site <noreply@digi.site>",
      to: identifier,
      subject: "Login to digi.site",
      html: `<p>Click <a href="${url}">here</a> to sign in.</p>`,
    });
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw new Error("Email sending failed");
  }
}
