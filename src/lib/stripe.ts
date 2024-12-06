import { Context } from "hono";
import Stripe from "stripe";

export const stripeClient = () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-11-20.acacia",
  });
  return stripe;
};

export const getSessionInfo = async (c: Context, sessionId: string) => {
  const user = c.get("user");
  if (!user) {
    throw new Error("Unauthorized");
  }

  const stripe = stripeClient();

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const subscription = await stripe.subscriptions.retrieve(
    session?.subscription as string
  );

  const payment = await stripe.paymentMethods.retrieve(
    subscription?.default_payment_method as string
  );

  const product = await stripe.products.retrieve(
    subscription.items.data[0].plan.product as string
  );

  const price = await stripe.prices.retrieve(
    subscription.items.data[0].price.id as string
  );

  return { session, subscription, payment, product, price };
};
