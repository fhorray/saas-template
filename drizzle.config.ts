import * as dotenv from 'dotenv';

import { defineConfig } from 'drizzle-kit';

dotenv.config({
  path: '.dev.vars',
});

export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/schemas',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
