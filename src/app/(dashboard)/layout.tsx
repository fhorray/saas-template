import { Header } from "@/components/commom/header";
import { Sidebar } from "@/components/commom/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import React, { ReactNode } from "react";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const cookiesStore = await cookies();
  const defaultOpen = cookiesStore.get("sidebar:state")?.value === "true";

  return (
    <div className="pl-24">
      <Sidebar />

      <div className="flex flex-col">
        <Header />

        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
