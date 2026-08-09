import "./globals.css";
import { Inter, Manrope } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { Navbar } from "@/components/shared/Navbar";
import { getMe } from "@/service/getMe";

const manropeHeading = Manrope({ subsets: ['latin'], variable: '--font-heading' });

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fixora",
  description: "Home Service Marketplace",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manropeHeading.variable} font-sans`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster position="top-center" richColors />
        {children}
        {/* footer */}
      </body>
    </html>
  );
}
