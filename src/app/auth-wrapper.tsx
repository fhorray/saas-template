"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { authClient } from "../lib/auth-client";
import { PUBLIC_ROUTES, ROLES } from "../config";

/**
 * @constant {RegExp} publicRoutesRegex
 * @description Regular expression to check if a route is one of the public routes defined in PUBLIC_ROUTES.
 * @example
 * const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];
 * publicRoutesRegex.test("/sign-in"); // true
 * publicRoutesRegex.test("/admin"); // false
 */
const publicRoutesRegex = new RegExp(
  `^\\/(${PUBLIC_ROUTES.map((route) => route.slice(1)).join("|")})$`
);

/**
 * @constant {Array<Object>} ROUTE_CONFIG
 * @description Configuration array for route handling, defining authentication and role requirements.
 * Each object represents a route configuration.
 * @property {RegExp} path - Regular expression to match the route.
 * @property {boolean} auth - Specifies if authentication is required for the route.
 * @property {Array<string>} [roles] - Optional array of roles allowed to access the route.
 * @example
 * const ROUTE_CONFIG = [
 *   { path: publicRoutesRegex, auth: false },  // Public routes
 *   { path: /^\/admin/, auth: true, roles: ["superadmin"] } // Admin routes
 * ];
 */
const ROUTE_CONFIG = [
  { path: publicRoutesRegex, auth: false }, // Public routes
  { path: /^\/admin/, auth: true, roles: ["superadmin"] }, // Admin routes
  { path: /.*/, auth: true }, // All other requires authentication
];

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSessionAndRedirect = async () => {
      try {
        // Obtém a sessão do usuário
        const session = await authClient.getSession();
        const userRole = session.data?.user?.role;

        // Encontra a configuração da rota atual
        const routeConfig = ROUTE_CONFIG.find(({ path }) =>
          path.test(pathname)
        );

        if (!routeConfig) {
          // Se não houver configuração para a rota, permite o acesso
          setIsLoading(false);
          return;
        }

        if (routeConfig.auth) {
          // Se a rota exigir autenticação
          if (!session.data?.user) {
            // Se o usuário não estiver autenticado, redireciona para o login
            router.push("/sign-in");
            return;
          }

          if (routeConfig.roles && !routeConfig.roles.includes(userRole!)) {
            // Se a rota exigir roles específicas e o usuário não tiver a role necessária
            router.push("/"); // Redireciona para a página inicial
            return;
          }
        } else {
          // Se a rota for pública e o usuário estiver autenticado, redireciona para o dashboard
          if (session.data?.user && pathname === "/sign-in") {
            router.push("/portal");
            return;
          }
        }

        // Se tudo estiver correto, permite o acesso
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching session:", error);
        // Em caso de erro, redireciona para o login se a rota for privada
        if (!PUBLIC_ROUTES.includes(pathname)) {
          router.push("/sign-in");
        } else {
          setIsLoading(false);
        }
      }
    };

    checkSessionAndRedirect();
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col gap-4 items-center justify-center">
        <Loader2Icon className="animate-spin" />
        <span className="text-xl font-bold text-gra">Carregando...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default AuthWrapper;
