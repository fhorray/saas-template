import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { APP_CONFIG } from "./constants";
import { MAIN_URL, ROUTES } from "./routes";



// Helper to normalize path and handle trailing slashes
function normalizePath(pathname: string) {
  // remove trailing slash except when path is root "/"
  if (pathname !== '/' && pathname.endsWith('/')) {
    return pathname.replace(/\/+$/, '');
  }
  return pathname;
}

// Helper: check if a path matches a route pattern (exact or prefix for nested routes)
function matchesAny(pathname: string, list: string[]) {
  return list.some(route => {
    if (route === '/') {
      return pathname === '/';
    }
    // match exact or subpaths like /auth, /auth
    return pathname === route || pathname.startsWith(route + '/');
  });
}

export function proxy(request: NextRequest) {
  const rawPath = request.nextUrl.pathname;
  const pathname = normalizePath(rawPath);

  const sessionCookie = getSessionCookie(request, {
    cookiePrefix: APP_CONFIG.PREFIX,
  });

  // 0. Allow public routes immediately (so "/" won't be accidentally redirected)
  if (matchesAny(pathname, ROUTES.public)) {
    // If user is on /auth and already authenticated, redirect to main (handled later).
    // For other public pages (like "/"), just let them proceed even if no session.
    // This avoids catching public routes in generic "not authenticated" checks.
    if (matchesAny(pathname, ROUTES.auth) && sessionCookie) {
      return NextResponse.redirect(new URL(MAIN_URL, request.url));
    }
    return NextResponse.next();
  }

  // 1. If not authenticated and trying to access non-public (private) routes -> redirect to /auth
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // 2. Authenticated user hitting an auth route (e.g. /auth or /auth/*) -> redirect to dashboard
  if (sessionCookie && matchesAny(pathname, ROUTES.auth)) {
    return NextResponse.redirect(new URL(MAIN_URL, request.url));
  }

  // 3. All other cases: allow
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/|api/|trpc/|.*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
