import { auth } from "@/lib/auth";

export type Bindings = {
  PROJECT_NAME: string;
  DATABASE_URL: string;
  FRONTEND_URL: string;
  BACKEND_URL: string;
  DOMAIN: string;
  JWT_SECRET_KEY: string;

  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  RESEND_API_KEY: string;
  SESSION_SECRET: string;
  SESSEION_DURATION: number;

  R2_ACCESS_KEY_ID: string;
  R2_SECRET_ACCESS_KEY: string;
  R2_BUCKET_NAME: string;
  R2_ACCOUNT_ID: string;
  DEFAULT_UPLOAD_SIZE: number;

  STRIPE_API_KEY: string;
  STRIPE_WHSEC_MAIN: string;
  STRIPE_WHSEC_CONNECT: string;
  STRIPE_ACCOUNT_ID: string;

  PROFISSIONAL_PLUS_PRICE: string;
  PROFISSIONAL_PRICE: string;

  WHATSAPP_TOKEN: string;
  WHATSAPP_PHONE_NUMBER_ID: string;
  WHATSAPP_WEBHOOK_TOKEN: string;
};

export type Variables = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};
