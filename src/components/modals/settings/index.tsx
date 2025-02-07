"use client";

import React, { useState } from "react";
import { Settings, User, Lock, Bell, Shield, LogOut } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useResponsive } from "@/hooks/use-responsive";
import { NotificationsTab } from "./notifications-tab";
import { ProfileTab } from "./profile-tab";
import { SecurityTab } from "./security-tab";
import { PrivacyTab } from "./privacy-tab";

export const SettingsModal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isPhone } = useResponsive();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User, component: ProfileTab },
    { id: "security", label: "Security", icon: Lock, component: SecurityTab },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      component: NotificationsTab,
    },
    { id: "privacy", label: "Privacy", icon: Shield, component: PrivacyTab },
  ];

  const ActiveTabComponent =
    tabs.find((tab) => tab.id === activeTab)?.component || ProfileTab;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <VisuallyHidden>
        <DialogTitle></DialogTitle>
      </VisuallyHidden>
      <DialogContent className="max-w-[1000px] w-[90vw] max-h-[90vh] p-0 rounded-md">
        <div className={cn("flex h-[80vh]", isPhone && "flex-col")}>
          {!isPhone && (
            <div className="w-64 bg-gray-50 p-6 border-r border-gray-200">
              <div className="flex items-center gap-3 mb-8">
                <Settings className="w-6 h-6 text-red-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Configurations
                </h2>
              </div>
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                      activeTab === tab.id
                        ? "bg-red-50 text-red-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>
              <div className="mt-auto pt-8 border-t border-gray-200">
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() =>
                    authClient.signOut({
                      fetchOptions: {
                        onSuccess: () => router.push("/sign-in"),
                      },
                    })
                  }
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>
          )}

          {isPhone && (
            <div className="w-full p-4 flex gap-2 justify-between pt-10">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="w-full"
                  variant={activeTab === tab.id ? "destructive" : "ghost"}
                >
                  <tab.icon />
                </Button>
              ))}
            </div>
          )}

          <div className="flex-1 p-8 overflow-y-auto">
            <ActiveTabComponent user={user} isPhone={isPhone} />
          </div>

          {isPhone && (
            <div className="w-full py-2 border-t-2 border-gray-500 mt-4 flex justify-center items-center">
              <Button
                variant="outline"
                onClick={() =>
                  authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => router.replace("/sign-in"),
                    },
                  })
                }
              >
                <LogOut /> Sign Out
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
