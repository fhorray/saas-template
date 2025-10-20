import { db } from "@/server/database/client";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/server/database/schemas";
import { APP_CONFIG } from "@/constants";

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema
  }),

  emailAndPassword: {
    enabled: true,
  },


  // ADVANCED CONFIG
  advanced: {
    cookiePrefix: APP_CONFIG.PREFIX,
  },
  session: {
    // AVOID CALLING /get-session every request
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
});