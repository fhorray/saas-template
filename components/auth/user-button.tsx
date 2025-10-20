'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { AVATAR_STYLE } from '@/constants';
import { useAuth } from '@/hooks/use-auth';
import { LogOut, Settings } from 'lucide-react';
import { AccountModal } from './account-modal';

export const UserButton = () => {
  const { user, logout, isPending } = useAuth();

  return (
    <DropdownMenu>
      {isPending ? (
        <Skeleton className="h-10 w-10 rounded-full" />
      ) : (
        <DropdownMenuTrigger asChild>
          <Avatar className="h-10 w-10 cursor-pointer">
            <AvatarImage
              src={
                user?.image ??
                `https://api.dicebear.com/9.x/${AVATAR_STYLE}/svg?seed=${user?.name}`
              }
              alt={user?.name}
            />
          </Avatar>
        </DropdownMenuTrigger>
      )}

      <DropdownMenuContent className="w-[340px] p-2" align="end" sideOffset={8}>
        {/* Active Account Section */}
        <div className="p-2">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={`https://api.dicebear.com/9.x/${AVATAR_STYLE}/svg?seed=${user?.name}`}
                alt={user?.name}
              />
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-base text-foreground truncate">
                {user?.name}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <AccountModal>
              <Button variant="outline" size="sm" className="flex-1 h-9">
                <Settings className="h-4 w-4 mr-2" />
                Manage account
              </Button>
            </AccountModal>

            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9"
              onClick={() => logout()}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>

        {/* <DropdownMenuSeparator /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
