import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { PUBLIC_ROUTES, ROLES } from "./config";
import { RouteConfig } from "./types/common";

const publicRoutesRegex = new RegExp(
  `^\\/(${PUBLIC_ROUTES.map((route) => route.slice(1)).join("|")})$`
);

// Define your route types
const ROUTE_CONFIG: RouteConfig[] = [
  { path: publicRoutesRegex, auth: false },
  { path: /^\/admin/, auth: true, roles: ["superadmin"] },
  { path: /.*/, auth: true },
];

export async function middleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;

  // Get the user's session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const routeConfig = ROUTE_CONFIG.find(({ path }) => path.test(currentPath));

  if (!routeConfig) {
    return NextResponse.next();
  }

  if (routeConfig.auth) {
    if (!session) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    if (routeConfig.roles && !routeConfig.roles.includes(session.user.role)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else {
    if (session && currentPath === "/sign-in") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|favicon\\.ico|public).*)", // Match all routes except for specific ones
  ],
};
