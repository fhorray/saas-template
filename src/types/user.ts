import { users } from "@/db/schemas";
import { createInsertSchema } from "drizzle-zod";

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
// schema zod generated from a drizzle table, use it to extend or refine as you want.
export const insertUserSchema = createInsertSchema(users);
