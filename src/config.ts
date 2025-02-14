import { Currency, Locale } from "./types/common";

export const PUBLIC_ROUTES = ["/sign-in", "/sign-up", "/text/one"];
export const PRIVATE_ROUTES = ["/protected", "/"];
export const ADMIN_ROUTE = ["/admin(.?)"];

/**
 * Roles available in the application.
 * If you modify these roles, ensure to update/push the database migrations accordingly on every update you make in here.
 */
export const ROLES = {
  Superadmin: "superadmin",
  Admin: "admin",
  User: "user",
} as const;

export const ROLE_LIST = Object.values(ROLES);

export const APP_INFO = {
  Name: "App Name",
  Description: "A cool Description here",
  Prefix: "app_name", // this will be used to name the session cookie: app_name.session
} as const;

/**
 * Stripe subscription plans available in the application.
 * Each plan includes a name, Stripe price ID, and a flag indicating whether it is featured.
 */
export const STRIPE_PLANS = [
  {
    plan_name: "Pro",
    price_id: "price_1QT4wpIlpoKc18GMq9aIP2f1",
    isFeatured: false,
  },
  {
    plan_name: "Plus",
    price_id: "price_1QT7G6IlpoKc18GMRy6qqTGn",
    isFeatured: true,
  },
  {
    plan_name: "Premium",
    price_id: "price_1QT7G6IlpoKc18GMRy6qqTGn",
    isFeatured: true,
  },
] as const;

export const STRIPE_PLAN_NAMES = STRIPE_PLANS.map((p) => p.plan_name) as [
  (typeof STRIPE_PLANS)[number]["plan_name"],
  ...(typeof STRIPE_PLANS)[number]["plan_name"][]
];

// DEFINE TRIAL DAYS FOR ALL THE SUBSCRIPTIONS
export const TRIAL_DAYS = 0;

// LOCALIZATION
export const DEFAULT_LOCALE: Locale = "pt-BR";
export const DEFAULT_CURRENCY: Currency = "BRL";
