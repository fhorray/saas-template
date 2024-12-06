import { Bindings, Variables } from "@/types/cf-bindings";

import { Hono } from "hono";
import { getProducts } from "./controllers";

const app = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

app.get("/products", ...getProducts);

export default app;
