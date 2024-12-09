import { Bindings, Variables } from "@/types/bindings";

import { Hono } from "hono";
import {
  getSubscription,
  goToCheckout,
  goToPortal,
  subscriptionCallback,
} from "./controllers";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { stripeClient } from "@/lib/stripe";
import { createAPIResponse } from "@/utils/api";

const app = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

// get current subscription
app.get("/", ...getSubscription);

// checkout
app.post("/checkout", ...goToCheckout);
app.post("/portal", ...goToPortal);
app.get("/callback", ...subscriptionCallback);
// app.patch("/", ...updateSubscription);

export default app;
