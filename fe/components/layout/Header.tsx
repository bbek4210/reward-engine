"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../ui/Button";
import { useState, useEffect, useRef } from "react";
import { useUser } from "@/contexts/UserContext";
import { useNotifications } from "@/contexts/ToastContext";
import type { ToastType } from "@/contexts/ToastContext";
import {
  Wallet,
  Bell,
  LogOut,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Trash2,
} from "lucide-react";

function timeAgo(date: Date): string {
  const diff = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export interface HeaderProps {
  variant?: "dashboard" | "leaderboard";
  onConnectWallet?: () => void;
  onDisconnectWallet?: () => void;
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
  onConnectWallet,
  onDisconnectWallet,
  walletConnected = false,
  walletAddress,
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const walletMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { points, loading } = useUser();
  const { notifications, unreadCount, markAllRead, clearNotifications } =
    useNotifications();

  // Close wallet menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        walletMenuRef.current &&
        !walletMenuRef.current.contains(event.target as Node)
      ) {
        setShowWalletMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close notification panel when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const NOTIF_ICONS: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />,
    error: <XCircle className="w-4 h-4 text-rose-500 shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />,
    info: <Info className="w-4 h-4 text-blue-500 shrink-0" />,
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Missions" },
    { href: "/polls", label: "Polls" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/redeem", label: "Redeem" },
    { href: "/referral", label: "Refer & Earn" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white border-b border-[#ECE7E4] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
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
                    : "text-civic-text-secondary hover:text-[#E11D48]"
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
            <div className="relative" ref={notifRef}>
              <button
                className="w-10 h-10 rounded-full bg-white border border-[#ECE7E4] flex items-center justify-center hover:bg-gray-50 transition-colors relative"
                onClick={() => {
                  setShowNotifications((v) => !v);
                  if (!showNotifications) markAllRead();
                }}
              >
                <Bell className="w-5 h-5 text-civic-text-secondary" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 bg-[#E11D48] rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Panel */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                  {/* Panel Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">
                      Notifications
                    </h3>
                    {notifications.length > 0 && (
                      <button
                        onClick={clearNotifications}
                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        Clear all
                      </button>
                    )}
                  </div>

                  {/* Notification List */}
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                        <Bell className="w-8 h-8 mb-2 opacity-30" />
                        <p className="text-sm">No notifications yet</p>
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`flex items-start gap-3 px-4 py-3 border-b border-gray-50 last:border-0 transition-colors ${
                            n.read ? "bg-white" : "bg-rose-50/40"
                          }`}
                        >
                          <div className="mt-0.5">{NOTIF_ICONS[n.type]}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-800 leading-snug">
                              {n.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {timeAgo(n.timestamp)}
                            </p>
                          </div>
                          {!n.read && (
                            <span className="w-2 h-2 bg-rose-500 rounded-full mt-1.5 shrink-0" />
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Wallet / Profile */}
            {walletConnected && walletAddress ? (
              <div className="relative" ref={walletMenuRef}>
                <button
                  onClick={() => setShowWalletMenu(!showWalletMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-indigo-500 to-purple-600 rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  <Wallet className="w-4 h-4 text-white" />
                  <span className="text-sm font-semibold text-white">
                    {truncateAddress(walletAddress)}
                  </span>
                </button>

                {/* Wallet Dropdown Menu */}
                {showWalletMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">
                        Connected Wallet
                      </p>
                      <p className="text-sm font-medium text-gray-900 break-all">
                        {walletAddress}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setShowWalletMenu(false);
                        onDisconnectWallet?.();
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Disconnect Wallet
                    </button>
                  </div>
                )}
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
