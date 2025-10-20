import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import api from "@/server"
// Import Middlewares
import authMiddleware from '@/server/middlewares/auth'
import corsMiddleware from '@/server/middlewares/cors'
import { auth } from '@/lib/auth/server'

const app = new Hono().basePath('/api')
  .use("*", corsMiddleware) // Apply CORS middleware to all routes
  .use("*", authMiddleware) // Apply AUTH middleware to all routes
  .on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw))
  .route('/', api)

export const GET = handle(app)
export const POST = handle(app)
export const DELETE = handle(app)
export const PATCH = handle(app)
export const PUT = handle(app)