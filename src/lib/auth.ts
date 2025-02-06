import { APP_INFO, ROLES, ROLE_LIST } from "@/config";
import { db } from "@/db";
import {
  accounts,
  sessions as sessionDb,
  users as userDb,
  verifications,
} from "@/db/schemas";
import { BetterAuthPlugin, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

// plugins
import {
  admin,
  createAuthEndpoint,
  createAuthMiddleware,
  openAPI,
} from "better-auth/plugins";
import { drizzle } from "drizzle-orm/neon-http";

export const auth = betterAuth({
  database: drizzleAdapter(drizzle(process.env.DATABASE_URL!), {
    provider: "pg",
    schema: {
      users: userDb,
      sessions: sessionDb,
      accounts: accounts,
      verifications: verifications,
    },
    usePlural: true,
  }),

  trustedOrigins: ["http://127.0.0.1:8788"],

  emailAndPassword: {
    enabled: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      setTimeout(() => {
        console.log(`Email enviado para: ${user.email}`);
      }, 2000);
    },
  },

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
      adminRole: ROLES.Superadmin,
    }),
    openAPI(),
  ],

  user: {
    additionalFields: {
      role: {
        type: ROLE_LIST,
      },
    },
  },
});

export type TSession = typeof auth.$Infer.Session;
