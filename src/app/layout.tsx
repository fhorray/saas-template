import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { APP_INFO } from "@/config";
import { Sidebar } from "@/components/commom/sidebar";
import { Header } from "@/components/commom/header";
import { QueryProvider } from "@/providers/react-query-provider";
import DashboardLayout from "./main-layout";
import AuthWrapper from "@/client-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: APP_INFO.Name,
  description: APP_INFO.Description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <DashboardLayout>
            <AuthWrapper>{children}</AuthWrapper>
          </DashboardLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
