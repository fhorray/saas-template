import { auth } from "@/lib/auth";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/api");

// BETTER AUTH
app.get("/auth/*", (c) => auth.handler(c.req.raw));
app.post("/auth/*", (c) => auth.handler(c.req.raw));

app.get("/hello", (c) => {
  return c.json({
    message: "Hello Next.js!",
  });
});

export const GET = handle(app);
export const POST = handle(app);
