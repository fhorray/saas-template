import { APP_INFO, ROLES } from "@/constants";
import { db } from "@/db";
import { account, session, user, verification } from "@/db/schemas";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: user,
      session: session,
      account: account,
      verification: verification,
    },
  }),

  emailAndPassword: {
    enabled: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await setTimeout(() => {
        console.log(`Email enviado para: ${user.email}`);
      }, 2000);
    },
  },

  trustedOrigins: ["http://localhost:3000"],

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      mapProfileToUser: (profile) => {
        return {
          firstName: profile.given_name,
          lastName: profile.family_name,
        };
      },
    },
  },

  advanced: {
    cookies: {
      session_token: {
        name: `${APP_INFO.Prefix.trim().toLowerCase()}.session`,
      },
    },
  },

  plugins: [
    admin({
      defaultRole: ROLES.User,
    }),
  ],
});
