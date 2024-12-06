import { auth } from "@/lib/auth";
import { Hono } from "hono";
import { handle } from "hono/vercel";

import subscriptionRoutes from "@/features/subscription/api/routes";
import stripeRoutes from "@/features/stripe/api/routes";
import { Variables } from "@/types/cf-bindings";

export const runtime = "edge";

const app = new Hono<{
  Variables: Variables;
}>().basePath("/api");

// middleware to set the logged user inside hono context
app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

app.on(["POST", "GET"], "/auth/**", (c) => {
  return auth.handler(c.req.raw);
});

app.get("/hello", (c) => {
  return c.text("Hello Next.js!");
});

// routes
app.route("/subscription", subscriptionRoutes);
app.route("/stripe", stripeRoutes);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
