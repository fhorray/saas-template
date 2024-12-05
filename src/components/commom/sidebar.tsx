"use client";

import {
  CalendarIcon,
  DiamondIcon,
  InboxIcon,
  HomeIcon,
  LogOutIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";

import React from "react";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth-client";

// menu items
const items = [
  { label: "Home", url: "#", icon: HomeIcon },
  {
    label: "Inbox",
    url: "#",
    icon: InboxIcon,
  },
  {
    label: "Calendar",
    url: "#",
    icon: CalendarIcon,
  },
  {
    label: "Search",
    url: "#",
    icon: SearchIcon,
  },
  {
    label: "Settings",
    url: "#",
    icon: SettingsIcon,
  },
];

export const Sidebar = () => {
  return (
    <aside className="flex flex-col items-center justify-between h-screen w-24 bg-white border-gray-200 border-r-2  fixed left-0 p-2 py-4">
      <div className="flex flex-col items-center">
        <div className="bg-gray-200 rounded-full h-14 w-14 flex items-center justify-center">
          <DiamondIcon />
        </div>

        <div className="w-full flex flex-col p-4 gap-4">
          {items.map((item) => (
            <Button variant={"ghost"} size={"icon"} key={item.label}>
              <item.icon className="mr-2 !h-5 !w-5" />
            </Button>
          ))}
        </div>
      </div>

      {/* logout button */}
      <Button variant={"outline"} size={"icon"} onClick={() => logout()}>
        <LogOutIcon />
      </Button>
    </aside>
  );
};
