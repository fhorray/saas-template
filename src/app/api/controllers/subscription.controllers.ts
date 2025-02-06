import { createFactory } from "hono/factory";
import { getSubscriptionService } from "@/app/api/services/subscription.services";
import { Bindings, Variables } from "@/types/bindings";
import { createAPIResponse } from "@/app/api/response-helper";
import { zValidator } from "@hono/zod-validator";

import { z } from "zod";
import dayjs from "dayjs";

import { createId } from "@paralleldrive/cuid2";

import { STRIPE_PLANS, STRIPE_PLAN_NAMES, TRIAL_DAYS } from "@/config";
import { getSessionInfo, stripeClient } from "@/lib/stripe";
import { db } from "@/db";
import { subscriptions } from "@/db/schemas";
import { InsertSubscription } from "@/types/subscription";

const factory = createFactory<{
  Variables: Variables;
  Binding: Bindings;
}>();

// GET CURRENT SUBSCRIPTION
export const getSubscription = factory.createHandlers(async (c) => {
  try {
    const subscription = await getSubscriptionService(c);
    return c.json(createAPIResponse({ status: "success", data: subscription }));
  } catch (error) {
    return c.json(
      createAPIResponse({
        status: "error",
        error: error as Error,
        message: (error as Error).message,
      })
    );
  }
});

// CREATE CHECKOUT
export const goToCheckout = factory.createHandlers(
  zValidator(
    "query",
    z.object({
      plan: z.enum(STRIPE_PLAN_NAMES),
    })
  ),
  async (c) => {
    const user = c.get("user");

    if (!user) {
      return c.json(
        createAPIResponse({ status: "error", message: "User is not logged-in" })
      );
    }

    // get the plan passed in the query endpoint
    const { plan } = c.req.valid("query");
    const priceId = STRIPE_PLANS.find((p) => p.plan_name === plan)?.price_id;

    try {
      const stripe = stripeClient();

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer_email: user.email,
        metadata: {
          userId: user.id,
        },

        allow_promotion_codes: true,
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/subscription/callback?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscription`,

        // PRODUCTS & PRICE
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],

        // TRIAL
        ...(TRIAL_DAYS > 0
          ? {
              subscription_data: {
                trial_period_days: TRIAL_DAYS,
              },
            }
          : {}),
      });

      // return the whole session
      return c.json(createAPIResponse({ status: "success", data: session }));
    } catch (error) {
      return c.json(
        createAPIResponse({
          status: "error",
          error: error as Error,
          message: (error as Error).message,
        })
      );
    }
  }
);

// SUBSCRIPTION CALLBACK
export const subscriptionCallback = factory.createHandlers(
  zValidator(
    "query",
    z.object({
      session_id: z.string(),
    })
  ),
  async (c) => {
    const { session_id } = c.req.valid("query");

    const user = c.get("user");

    if (!user) {
      return c.json(
        createAPIResponse({ status: "error", message: "User is not logged-in" })
      );
    }

    try {
      const sessionInfo = await getSessionInfo(session_id);

      // insert subscription inside db
      if (
        sessionInfo.session.status === "complete" &&
        sessionInfo.session.payment_status === "paid"
      ) {
        const subscriptionDb = await db.insert(subscriptions).values({
          id: createId(),
          userId: user.id,
          customerId: sessionInfo.subscription?.customer as string,
          status: sessionInfo.subscription?.status,
          subscriptionId: sessionInfo.subscription?.id,
          renewsAt: dayjs
            .unix(sessionInfo.subscription?.current_period_end!)
            .toISOString(),
          productName: sessionInfo.product?.name,
          trialEndsAt: sessionInfo.subscription?.trial_end
            ? dayjs.unix(sessionInfo.subscription?.trial_end).toISOString()
            : null,
          cardBrand: sessionInfo.payment.card?.brand,
          metadata: sessionInfo.subscription?.metadata,
          cardLastFour: sessionInfo.payment.card?.last4,
          pricing: String(sessionInfo.price.unit_amount),
          subscribedAt: String(sessionInfo.subscription.start_date),
        });

        // send email
        // const { data, error } = await resend.emails.send({
        //   // from: `App Name <support@appname.com>`,
        //   to: [user.email as string],
        //   subject: "Welcome!",
        //   react: WelcomeEmail({}),
        // });
      }

      return c.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}?success=true`);
    } catch (error) {
      return c.json(
        createAPIResponse({
          status: "error",
          error: error as Error,
          message: (error as Error).message,
        })
      );
    }
  }
);

// PORTAL
export const goToPortal = factory.createHandlers(
  zValidator(
    "query",
    z.object({
      customer: z.string(),
    })
  ),
  async (c) => {
    const stripe = stripeClient();

    const { customer } = c.req.valid("query");

    try {
      const data = await stripe.billingPortal.sessions.create({
        customer,
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscription`,
      });

      return c.json(createAPIResponse({ status: "success", data }), 200);
    } catch (error) {
      return c.json(
        createAPIResponse({
          status: "error",
          error: error as Error,
          message: (error as Error).message,
        })
      );
    }
  }
);
