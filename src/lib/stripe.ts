import { Context } from 'hono';
import Stripe from 'stripe';

export const stripeClient = () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27.acacia',
  });
  return stripe;
};

export const getSessionInfo = async (sessionId: string) => {
  if (!sessionId) {
    throw new Error('Missing Session ID');
  }

  const stripe = stripeClient();

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const subscription = await stripe.subscriptions.retrieve(
    session?.subscription as string,
  );

  const payment = await stripe.paymentMethods.retrieve(
    subscription?.default_payment_method as string,
  );

  const product = await stripe.products.retrieve(
    subscription.items.data[0].plan.product as string,
  );

  const price = await stripe.prices.retrieve(
    subscription.items.data[0].price.id as string,
  );

  return { session, subscription, payment, product, price };
};
