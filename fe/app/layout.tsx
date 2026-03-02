"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import { UserProvider } from "@/contexts/UserContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { SolanaWalletProvider } from "@/contexts/WalletAdapterProvider";
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
        <SolanaWalletProvider>
          <ToastProvider>
            <UserProvider>
              {children}
              <PointsToast />
              <ToastContainer />
            </UserProvider>
          </ToastProvider>
        </SolanaWalletProvider>
      </body>
    </html>
  );
}
