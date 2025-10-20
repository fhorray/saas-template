import { auth } from "@/lib/auth/server";
import { Context, Next } from "hono";

export default async function authMiddleware(c: Context, next: Next) {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers
  });

  if (!session) {
    c.set('user', null);
    c.set('session', null);
    return next();
  };


  c.set('user', session.user);
  c.set('session', session.session);
  return next();

}