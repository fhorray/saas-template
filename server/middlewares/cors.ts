import { Context, Next } from "hono";
import { cors } from "hono/cors";

export default function corsMiddleware(c: Context, next: Next) {
  const middleware = cors({
    origin: [process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
  return middleware(c, next);
}