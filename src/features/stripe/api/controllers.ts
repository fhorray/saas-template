import { DEFAULT_LOCALE, TRIAL_DAYS } from "@/config";
import { stripeClient } from "@/lib/stripe";
import { Bindings, Variables } from "@/types/cf-bindings";
import { createAPIResponse } from "@/utils/api";
import { createFactory } from "hono/factory";

const factory = createFactory<{
  Variables: Variables;
  Binding: Bindings;
}>();

export const getProducts = factory.createHandlers(async (c) => {
  try {
    const stripe = stripeClient();

    const products = await stripe.products.list();

    const mapped = await Promise.all(
      products.data.map(async (product) => {
        const price = await stripe.prices.retrieve(
          product.default_price as string
        );

        return {
          productId: product.id,
          productName: product.name,
          productDescription: product.description,
          productImages: product.images,
          priceId: price.id,
          priceAmount: (price.unit_amount! / 100)?.toLocaleString(
            DEFAULT_LOCALE,
            {
              style: "currency",
              currency: price.currency.toUpperCase(),
            }
          ),
          currency: price.currency.toUpperCase(),
          recurring: price.recurring ? price.recurring.interval : null,
          productActive: product.active,
          productType: product.type,
          recurringInterval: price.recurring ? price.recurring.interval : null,
          priceTrialPeriod: price.recurring
            ? price.recurring.trial_period_days
            : TRIAL_DAYS,
        };
      })
    );

    return c.json(createAPIResponse({ status: "success", data: mapped }));
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
