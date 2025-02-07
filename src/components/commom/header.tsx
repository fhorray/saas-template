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
import { TSession } from "@/lib/auth";

import { authClient, logout } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { SettingsModal } from "../modals/settings";

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

  const session = authClient.useSession().data as TSession;
  const user = session?.user;

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
          </Avatar>

          <div>
            <h4 className="font-bold">{user?.name}</h4>
            <span className="text-sm">{user?.role}</span>
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
          <SettingsModal>
            <span className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0">
              Configurations
            </span>
          </SettingsModal>
          {/* plan */}
          <DropdownMenuItem onClick={() => router.push("/subscription")}>
            Subscription
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* logout */}
        <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
