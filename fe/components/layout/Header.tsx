"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../ui/Button";
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { Wallet, Bell, User } from "lucide-react";

export interface HeaderProps {
  variant?: "dashboard" | "leaderboard";
  onConnectWallet?: () => void;
  onVerifyCitizen?: () => void;
  walletConnected?: boolean;
  walletAddress?: string;
}

/**
 * Header Component
 *
 * Design Specs:
 * - Height: 80px
 * - Background: White with subtle shadow
 * - Left: Icon + "Janamat Rewards" + subtitle
 * - Right: Connect Wallet (outline) + Verify Citizen (solid red)
 *
 * Layout Structure:
 * <header class="bg-white border-b border-[#ECE7E4]">
 *   <div class="max-w-[1280px] mx-auto px-6 py-4">
 *     [Logo + Text] --------------- [Buttons]
 *   </div>
 * </header>
 *
 * Tailwind Classes:
 * Container: max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between
 */
export default function Header({
  variant = "dashboard",
  onConnectWallet,
  onVerifyCitizen,
  walletConnected = false,
  walletAddress,
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const pathname = usePathname();
  const { points, loading } = useUser();

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Missions" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/redeem", label: "Redeem" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white border-b border-[#ECE7E4] sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo + Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#E11D48] rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <Link
                href="/"
                className="text-xl font-bold text-[#0F172A] hover:text-[#E11D48] transition-colors"
              >
                Janamat Rewards
              </Link>
              <p className="text-xs text-[#94A3B8]">
                Earn points for meaningful civic participation
              </p>
            </div>
          </div>

          {/* Center: Navigation (for leaderboard variant) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActiveLink(link.href)
                    ? "text-[#E11D48] border-b-2 border-[#E11D48] pb-1"
                    : "text-[#475569] hover:text-[#E11D48]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Points Display */}
            {walletConnected && (
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-rose-50 rounded-full border border-rose-100">
                <div className="w-6 h-6 bg-rose-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">≡</span>
                </div>
                <span className="text-sm font-bold text-rose-600">
                  {loading ? "..." : points.toLocaleString()} pts
                </span>
              </div>
            )}

            {/* Notifications */}
            <button
              className="w-10 h-10 rounded-full bg-white border border-[#ECE7E4] flex items-center justify-center hover:bg-gray-50 transition-colors relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-5 h-5 text-[#475569]" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#E11D48] rounded-full"></span>
            </button>

            {/* Wallet / Profile */}
            {walletConnected && walletAddress ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-md">
                  <Wallet className="w-4 h-4 text-white" />
                  <span className="text-sm font-semibold text-white">
                    {truncateAddress(walletAddress)}
                  </span>
                </div>
                <button className="w-10 h-10 rounded-full bg-white border border-[#ECE7E4] flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <User className="w-5 h-5 text-[#475569]" />
                </button>
              </div>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={onConnectWallet}>
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
