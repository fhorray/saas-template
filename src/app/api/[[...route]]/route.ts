import { auth } from '@/lib/auth';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import subscriptionRoutes from '@/app/api/routes/subscription.routes';
import stripeRoutes from '@/app/api/routes/stripe.routes';

// Middleware
import authMiddleware from '@/app/api/middlewares/auth-mid';

import { Variables } from '@/types/bindings';

export const runtime = 'edge';

const app = new Hono<{
  Variables: Variables;
}>().basePath('/api');

// middleware tos et the user inside hono context

app.on(['POST', 'GET'], '/auth/**', (c) => {
  return auth.handler(c.req.raw);
});

app.use('*', authMiddleware);

app.get('/hello', (c) => {
  return c.text('Hello Next.js!');
});

// routes
app.route('/subscription', subscriptionRoutes);
app.route('/stripe', stripeRoutes);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
