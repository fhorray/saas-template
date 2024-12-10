import { Bindings, Variables } from "@/types/bindings";

import { Hono } from "hono";
import { getProducts } from "@/app/api/controllers/stripe.controllers";

const app = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

app.get("/products", ...getProducts);

export default app;
