"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient, logout } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { CustomLoading } from "./custom-loading";

export const Header = () => {
  return (
    <main className="w-full h-20 bg-white border-gray-200 border-b-2 py-4 pl-4 flex items-center justify-between">
      <h2>Dashboard</h2>

      <UserNav />
    </main>
  );
};

// USER AVATAR WITH A MENU
const UserNav = () => {
  const router = useRouter();
  const { data: session, isPending, error } = authClient.useSession();
  const user = session?.user;

  if (isPending) return <CustomLoading />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-start gap-4 p-4 px-8 hover:bg-gray-100 hover:cursor-pointer transition-all">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={
                user?.image ??
                `https://api.dicebear.com/6.x/initials/svg?seed=${user?.name}`
              }
              alt="User Image"
            />
            <AvatarFallback></AvatarFallback>
          </Avatar>

          <div>
            <h4 className="font-bold">{user?.name}</h4>
            <span className="text-sm">User</span>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {/* profile */}
          <DropdownMenuItem>Profile</DropdownMenuItem>
          {/* configurations */}
          <DropdownMenuItem>Configurations</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() =>
            authClient.sendVerificationEmail({
              email: user?.email!,
              callbackURL: "http://localhost:3000",
              fetchOptions: {},
            })
          }
        >
          Verificar
        </DropdownMenuItem>

        {/* logout */}
        <DropdownMenuItem onClick={() => logout()}>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
