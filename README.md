# SaaS Template - Next.js with Hono.js, Drizzle ORM and Better Auth

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
- **Authentication**: Integrated with [Better Auth](https://better-auth.com/), a secure and simple solution for user authentication.
- **Environment Configuration**: Example .env.example provided for defining environment variables.
