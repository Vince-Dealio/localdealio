// ✅ Full code for src/lib/auth/options.ts

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { sendVerificationRequest } from "@/lib/sendVerificationRequest";
import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: "", // leave blank for custom handler
      from: "digi.site <noreply@digi.site>",
      async sendVerificationRequest({ identifier, url }) {
        await sendVerificationRequest({ identifier, url });
      },
    }),
  ],
  pages: {
    signIn: "/login",
    verifyRequest: "/verify-email",
  },
};
