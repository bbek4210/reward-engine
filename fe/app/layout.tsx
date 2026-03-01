"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";
import PointsToast from "@/components/ui/PointsToast";

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
        <UserProvider>
          {children}
          <PointsToast />
        </UserProvider>
      </body>
    </html>
  );
}
