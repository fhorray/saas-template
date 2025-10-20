'use client';

import type React from 'react';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { AVATAR_STYLE } from '@/constants';
import { useAuth } from '@/hooks/use-auth';
import { CreditCardIcon, ShieldIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

type TabType = 'profile' | 'security' | 'billing';

export function AccountModal({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  // Local States
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="!max-w-5xl p-4 gap-0 overflow-hidden space-y-4">
        <div className="space-y-2">
          <DialogTitle>
            {activeTab === 'billing'
              ? 'Billing'
              : activeTab === 'profile'
              ? 'Profile'
              : 'Security'}{' '}
            details
          </DialogTitle>
          <DialogDescription>
            Manage and update your{' '}
            {activeTab === 'billing'
              ? 'billing'
              : activeTab === 'profile'
              ? 'profile'
              : 'security'}{' '}
            information and settings.
          </DialogDescription>
        </div>

        <Tabs
          defaultValue={activeTab}
          onValueChange={(v) => setActiveTab(v as TabType)}
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="profile">
              <UserIcon className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security">
              <ShieldIcon className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="billing">
              <CreditCardIcon className="h-4 w-4 mr-2" />
              Billing
            </TabsTrigger>
          </TabsList>
          {/* Profile */}
          <TabsContent value="profile" className="space-y-6 mt-6">
            {/* Profile Section */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Profile
              </h3>
              <div className="flex items-center gap-4 p-4 rounded-lg border bg-card">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={
                      user?.image ??
                      `https://api.dicebear.com/9.x/${
                        AVATAR_STYLE || '/placeholder.svg'
                      }/svg?seed=${user?.name}`
                    }
                    alt={user?.name}
                  />
                </Avatar>
                <div className="flex-1">
                  <p className="text-base font-semibold">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Account holder
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Email Addresses */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Email addresses
              </h3>
              <div className="p-4 rounded-lg border bg-card">
                <p className="text-sm font-medium">
                  {user?.email || 'example@personal.com'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Primary email
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="mt-6">
            <p className="text-sm text-muted-foreground">CONTENT</p>
          </TabsContent>

          {/* Billing */}
          <TabsContent value="billing" className="mt-6">
            <p className="text-sm text-muted-foreground">CONTENT</p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
