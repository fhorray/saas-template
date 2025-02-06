import { relations } from "drizzle-orm";
import { pgTable, text, jsonb, pgEnum } from "drizzle-orm/pg-core";

import { users } from "./auth";

export const subscriptionStatusEnum = pgEnum("subscription_status_enum", [
  "incomplete",
  "incomplete_expired",
  "trialing",
  "active",
  "past_due",
  "canceled",
  "unpaid",
  "paused",
]);

export const subscriptions = pgTable("subscriptions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  customerId: text("customer_id"),
  pricing: text("pricing"),
  subscribedAt: text("subscribed_at"),
  status: subscriptionStatusEnum("status").default("incomplete"),
  subscriptionId: text("subscription_id").unique(),
  renewsAt: text("renews_at"),
  cancelAt: text("cancel_at"),
  canceledAt: text("canceled_at"),
  endedAt: text("ended_at"),
  productName: text("product_name"),
  metadata: jsonb("metadata").default("{}"),
  trialEndsAt: text("trial_ends_at"),
  cardBrand: text("card_brand"),
  cardLastFour: text("card_last_four"),
});

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}));
