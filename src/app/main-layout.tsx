"use client";

import { Header } from "@/components/commom/header";
import { Sidebar } from "@/components/commom/sidebar";
import { PUBLIC_ROUTES } from "@/config";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const path = usePathname();

  if (PUBLIC_ROUTES.includes(path)) return children;

  return (
    <div className="pl-24">
      <Sidebar />

      <div className="flex flex-col">
        <Header />

        <>{children}</>
      </div>
    </div>
  );
};

export default DashboardLayout;
