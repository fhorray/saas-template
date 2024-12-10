import { Bindings, Variables } from "@/types/bindings";

import { Hono } from "hono";
import {
  getSubscription,
  goToCheckout,
  goToPortal,
  subscriptionCallback,
} from "@/app/api/controllers/subscription.controllers";

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
