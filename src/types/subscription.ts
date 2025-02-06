import { subscriptions } from "@/db/schemas/subscription";
import { createInsertSchema } from "drizzle-zod";

export const insertSubscriptionSchema = createInsertSchema(subscriptions);

export type InsertSubscription = typeof subscriptions.$inferInsert;
export type SelectSubscription = typeof subscriptions.$inferSelect;
