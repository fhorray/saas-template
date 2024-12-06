import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { PUBLIC_ROUTES } from "./config";

export async function middleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;

  // Obter a sessão
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Usuário logado
  if (session) {
    // Redireciona usuário logado se ele estiver em uma rota pública
    if (PUBLIC_ROUTES.includes(currentPath)) {
      const destination = "/";
      if (currentPath !== destination) {
        return NextResponse.redirect(new URL(destination, req.url));
      }
    }
  } else {
    // Usuário não logado
    if (!PUBLIC_ROUTES.includes(currentPath)) {
      const destination = "/sign-in";
      if (currentPath !== destination) {
        return NextResponse.redirect(new URL(destination, req.url));
      }
    }
  }

  // Permitir continuar
  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/", "/dashboard", "/profile"],
};
