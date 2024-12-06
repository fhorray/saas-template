import { Currency, Locale } from "./types/common";

export const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];

export const ROLES = Object.freeze({
  Admin: "admin",
  User: "user",
});

export const ROLE_LIST = Object.values(ROLES);

export const APP_INFO = Object.freeze({
  Name: "App Name",
  Description: "A cool Description here",
  Prefix: "app_name", // this will be used to name the session cookie: app_name.session
});

// STRIPE PLANS
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
];

export const STRIPE_PLAN_NAMES = STRIPE_PLANS.map((p) => p.plan_name) as [
  (typeof STRIPE_PLANS)[number]["plan_name"],
  ...(typeof STRIPE_PLANS)[number]["plan_name"][]
];

// DEFINE TRIAL DAYS FOR ALL THE SUBSCRIPTIONS
export const TRIAL_DAYS = 2;

// LOCALIZATION
export const DEFAULT_LOCALE: Locale = "pt-BR";
export const DEFAULT_CURRENCY: Currency = "BRL";
