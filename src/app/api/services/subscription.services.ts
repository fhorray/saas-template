import { db } from "@/db";
import { subscriptions } from "@/db/schemas/subscription";
import { SelectSubscription } from "@/types/subscription";
import { User } from "better-auth";
import { eq } from "drizzle-orm";
import { Context } from "hono";

// UPDATE SUBSCRIPTION
export const getSubscriptionService = async (
  c: Context
): Promise<SelectSubscription | null> => {
  const user = c.get("user") as User;

  const [data] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, user?.id as string));

  if (!data) return null;

  return data;
};
