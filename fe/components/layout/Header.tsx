"use client";

import Link from "next/link";
import Button from "../ui/Button";
import { useState } from "react";

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

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
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
          {variant === "leaderboard" && (
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-[#475569] hover:text-[#E11D48] transition-colors"
              >
                Missions
              </Link>
              <Link
                href="/leaderboard"
                className="text-sm font-medium text-[#E11D48] border-b-2 border-[#E11D48] pb-1"
              >
                Leaderboard
              </Link>
              <Link
                href="/rewards"
                className="text-sm font-medium text-[#475569] hover:text-[#E11D48] transition-colors"
              >
                Rewards
              </Link>
              <Link
                href="/profile"
                className="text-sm font-medium text-[#475569] hover:text-[#E11D48] transition-colors"
              >
                Profile
              </Link>
            </nav>
          )}

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {variant === "leaderboard" && (
              <button
                className="w-10 h-10 rounded-full bg-white border border-[#ECE7E4] flex items-center justify-center hover:bg-gray-50 transition-colors relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <svg
                  className="w-5 h-5 text-[#475569]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-0 right-0 w-2 h-2 bg-[#E11D48] rounded-full"></span>
              </button>
            )}

            {walletConnected && walletAddress ? (
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-[#475569]">
                  {truncateAddress(walletAddress)}
                </div>
                <Button variant="primary" size="sm" onClick={onVerifyCitizen}>
                  Verify Citizen
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={onConnectWallet}>
                  Connect Wallet
                </Button>
                <Button variant="primary" size="sm" onClick={onVerifyCitizen}>
                  Verify Citizen
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
