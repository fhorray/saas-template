import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ADMIN_ROUTE, PUBLIC_ROUTES } from "./config";

export async function middleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;

  // get better-auth session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // user is authenticated
  if (session) {
    if (PUBLIC_ROUTES.includes(currentPath)) {
      const destination = "/";
      if (currentPath !== destination) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // verify if user is trying to access an admin page and has a role "admin", if not redirect the user to the main page
    if (currentPath.startsWith(ADMIN_ROUTE) && session.user.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else {
    // user is unauthenticated
    if (!PUBLIC_ROUTES.includes(currentPath)) {
      const destination = "/sign-in";
      if (currentPath !== destination) {
        return NextResponse.redirect(new URL(destination, req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/sign-in",
    "/sign-up",
    "/dashboard",
    "/profile",
    "/admin",
    "/admin/users",
    "/subscription",
  ],
};
