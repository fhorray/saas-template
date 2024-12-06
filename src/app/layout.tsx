import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { APP_INFO } from "@/config";
import { Sidebar } from "@/components/commom/sidebar";
import { Header } from "@/components/commom/header";
import { QueryProvider } from "@/providers/react-query-provider";

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
          <div className="pl-24">
            <Sidebar />

            <div className="flex flex-col">
              <Header />

              <main>{children}</main>
            </div>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
