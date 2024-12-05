import { createInsertSchema } from "drizzle-zod";
import { user } from "@/db/schemas";

export type InsertUser = typeof user.$inferInsert;
export type SelectUser = typeof user.$inferSelect;

// schema zod generated from a drizzle table, use it to extend or refine as you want.
export const insertEventSchema = createInsertSchema(user);
