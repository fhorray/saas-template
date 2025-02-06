"use client";

import { Session, User } from "better-auth";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./config";
import { Loader2Icon } from "lucide-react";
import { authClient } from "./lib/auth-client";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await authClient.getSession();

        if (PRIVATE_ROUTES.includes(pathname) && !session.data?.user) {
          // Se for uma rota privada e o usuário não estiver autenticado, redireciona para login
          router.push("/sign-in");
        } else if (PUBLIC_ROUTES.includes(pathname) && session.data?.user) {
          // Se for uma rota pública e o usuário estiver autenticado, redireciona para o dashboard
          router.push("/portal");
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        if (PRIVATE_ROUTES.includes(pathname)) {
          router.push("/sign-in");
        } else {
          setIsLoading(false);
        }
      }
    };

    checkSession();
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
