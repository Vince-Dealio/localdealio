// src/lib/auth/options.ts
import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { sendVerificationRequest } from "@/lib/sendVerificationRequest";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM || "noreply@localdeal.io",
      async sendVerificationRequest({ identifier, url }) {
        await sendVerificationRequest({ identifier, url });
      },
      maxAge: 24 * 60 * 60, // 24h
    }),
  ],
  pages: {
    verifyRequest: "/verify-email", // keep your existing page
  },
};
