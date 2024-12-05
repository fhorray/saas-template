# SaaS Template - Next.js with Hono.js and Drizzle ORM

This project is a template built using [Next.js](https://nextjs.org/), [Hono.js](https://hono.dev/), and [Drizzle ORM](https://orm.drizzle.team/), designed to serve as a foundation for creating SaaS platforms. It integrates state management with Zustand and showcases best practices for a modern full-stack application.

---

## Getting Started

First, clone the template repository and remove the original remote:

```bash
git clone --depth=1 https://github.com/fhorray/saas-template new-project
cd new-project
git remote remove origin
```

Then, install the dependencies:

```bash
bun install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## Features

- **Backend Framework**: Built with [Hono.js](https://hono.dev/), a fast and lightweight web framework for the backend.
- **Database ORM**: Uses [Drizzle ORM](https://orm.drizzle.team/) for managing database queries with TypeScript support.
- **State Management**: Powered by [Zustand](https://zustand-demo.pmnd.rs/), providing a simple and scalable solution.
- **Environment Configuration**: Example .env.example provided for defining environment variables.
- **Cloudflare Integration**: Compatible with [Cloudflare Pages](https://pages.cloudflare.com/) and [Wrangler](https://developers.cloudflare.com/workers/wrangler/).

---

## Cloudflare Integration

This project supports deployment to Cloudflare Pages. It includes scripts to simplify integration:

- `pages:build`: Build the application for Pages using [`@cloudflare/next-on-pages`](https://github.com/cloudflare/next-on-pages).
- `preview`: Locally preview the application with the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/).
- `deploy`: Deploy the application to Cloudflare Pages using the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/).

> __Note:__ while the `dev` script is optimal for local development you should preview your Pages application as well (periodically or before deployments) in order to make sure that it can properly work in the Pages environment (for more details see the [`@cloudflare/next-on-pages` recommended workflow](https://github.com/cloudflare/next-on-pages/blob/main/internal-packages/next-dev/README.md#recommended-development-workflow))
