import { Variables } from "@/types/bindings";
import { Context, Hono, Next } from "hono";
import { auth } from "@/lib/auth";

// middleware to set the logged user inside hono context
const app = new Hono<{
  Variables: Variables;
}>().basePath("/api");

const authMiddleware = async (c: Context, next: Next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
};

export default authMiddleware;
