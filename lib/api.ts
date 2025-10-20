import type { AppType } from '@/server'
import { hc } from 'hono/client'

/**
 * Create a Hono client instance to interact with the API server.
 * Documentation: https://hono.dev/docs/guides/rpc
 */
const url = process.env.NEXT_PUBLIC_BASE_URL + "/api" || 'http://localhost:3001/api/'
export const API = hc<AppType>(url);