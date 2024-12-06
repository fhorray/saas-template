import { subscription } from "@/db/schemas/subscription";
import { createInsertSchema } from "drizzle-zod";

export const insertSubscriptionSchema = createInsertSchema(subscription);

export type InsertSubscription = typeof subscription.$inferInsert;
export type SelectSubscription = typeof subscription.$inferSelect;
