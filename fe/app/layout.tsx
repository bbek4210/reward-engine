"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";
import { ToastProvider } from "@/contexts/ToastContext";
import PointsToast from "@/components/ui/PointsToast";
import ToastContainer from "@/components/ui/ToastContainer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-warmGray-50`}
      >
        <ToastProvider>
          <UserProvider>
            {children}
            <PointsToast />
            <ToastContainer />
          </UserProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
