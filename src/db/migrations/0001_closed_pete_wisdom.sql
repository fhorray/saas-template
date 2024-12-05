ALTER TABLE "auth"."account" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "auth"."session" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "auth"."user" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "auth"."verification" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "auth"."session" ADD COLUMN "impersonatedBy" text;--> statement-breakpoint
ALTER TABLE "auth"."user" ADD COLUMN "role" text;--> statement-breakpoint
ALTER TABLE "auth"."user" ADD COLUMN "banned" boolean;--> statement-breakpoint
ALTER TABLE "auth"."user" ADD COLUMN "banReason" text;--> statement-breakpoint
ALTER TABLE "auth"."user" ADD COLUMN "banExpires" timestamp;