"use client";

import { useState } from "react";
import { usePhantomWallet } from "@/hooks/usePhantomWallet";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/contexts/ToastContext";
import Header from "@/components/layout/Header";
import { TrendingUp, Bitcoin, PiggyBank, Wallet } from "lucide-react";
import { walletApi } from "@/lib/api";
import { storage, STORAGE_KEYS } from "@/lib/storage";

interface RedemptionOption {
  id: string;
  sol: number;
  points: number;
  icon: React.ReactNode;
}

interface RedemptionHistory {
  date: string;
  points: number;
  sol: number;
  status: "Completed" | "Processing" | "Failed";
}

/**
 * Rewards/Redeem Page
 * Allows users to convert points to SOL and view redemption history
 */
export default function RedeemPage() {
  const wallet = usePhantomWallet();
  const { points, addPoints } = useUser();
  const toast = useToast();
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redemptionHistory, setRedemptionHistory] = useState<
    RedemptionHistory[]
  >([]);

  // Derive weekly gain from localStorage
  const weeklyGain = (() => {
    if (typeof window === "undefined") return 0;
    const weekStart = storage.get(STORAGE_KEYS.WEEK_START_POINTS);
    if (!weekStart) {
      storage.set(STORAGE_KEYS.WEEK_START_POINTS, String(points));
      return 0;
    }
    return Math.max(0, points - parseInt(weekStart));
  })();

  const redemptionOptions: RedemptionOption[] = [
    {
      id: "0",
      sol: 0.01,
      points: 20,
      icon: <TrendingUp className="w-8 h-8 text-rose-600" />,
    },
    {
      id: "1",
      sol: 0.05,
      points: 100,
      icon: <Bitcoin className="w-8 h-8 text-rose-600" />,
    },
    {
      id: "2",
      sol: 0.25,
      points: 500,
      icon: <PiggyBank className="w-8 h-8 text-rose-600" />,
    },
    {
      id: "3",
      sol: 0.5,
      points: 1000,
      icon: <Wallet className="w-8 h-8 text-rose-600" />,
    },
    {
      id: "4",
      sol: 1.0,
      points: 2000,
      icon: <Wallet className="w-8 h-8 text-rose-600" />,
    },
  ];

  const handleConnectWallet = async () => {
    if (!wallet.isPhantomInstalled) {
      toast(
        "Phantom wallet not found. Please install it from phantom.app",
        "error",
      );
      return;
    }
    await wallet.connect();
  };

  const handleDisconnectWallet = async () => {
    await wallet.disconnect();
  };

  const handleVerifyCitizen = () => {
    toast("Citizen verification coming soon", "info");
  };

  const handleRedeem = async (option: RedemptionOption) => {
    if (!wallet.connected || !wallet.address) {
      toast("Please connect your wallet first", "warning");
      return;
    }

    if (points < option.points) {
      toast("Insufficient points for this redemption", "warning");
      return;
    }

    setIsRedeeming(true);

    try {
      const result = (await walletApi.redeem(
        wallet.address,
        option.points,
        option.sol,
      )) as {
        success: boolean;
        error?: string;
        data?: { signature: string; txUrl: string; solAmount: number };
      };

      if (result.success && result.data) {
        // Deduct points from user context immediately
        addPoints(-option.points);

        // Add to history
        const newRedemption: RedemptionHistory = {
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          points: option.points,
          sol: option.sol,
          status: "Completed",
        };
        setRedemptionHistory([newRedemption, ...redemptionHistory]);

        toast(
          `✅ ${option.sol} SOL sent to your wallet! Tx: ${result.data.signature.slice(0, 8)}...`,
          "success",
        );

        // Open transaction in explorer
        window.open(result.data.txUrl, "_blank");
      } else {
        toast(`Redemption failed: ${result.error}`, "error");
      }
    } catch (error) {
      console.error("Redemption error:", error);
      toast("An error occurred during redemption", "error");
    } finally {
      setIsRedeeming(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      case "Failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4F2]">
      {/* Header */}
      <Header
        variant="dashboard"
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
        onVerifyCitizen={handleVerifyCitizen}
        walletConnected={wallet.connected}
        walletAddress={wallet.address || undefined}
      />

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-6 py-8 space-y-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Balance Card */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <div className="text-sm font-semibold text-gray-500 uppercase mb-2">
              CURRENT BALANCE
            </div>
            <div className="flex items-baseline gap-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">≡</span>
                </div>
                <span className="text-5xl font-bold text-gray-900">
                  {points.toLocaleString()}
                </span>
                <span className="text-2xl text-gray-500">pts</span>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium">
              <span>↗ +{weeklyGain} pts this week</span>
            </div>
          </div>

          {/* Featured Prize Card */}
          <div className="bg-gradient-to-br from-rose-500 to-rose-700 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />

            <div className="relative z-10">
              <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase mb-4">
                FEATURED PRIZE
              </div>
              <h2 className="text-2xl font-bold mb-2">Monthly Leaderboard</h2>
              <p className="text-rose-100 text-sm mb-6">
                The #1 Monthly Leaderboard winner receives 1.0 SOL automatically
                at the end of each month.
              </p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold">1.0 SOL</span>
              </div>
              <button className="px-6 py-2.5 bg-white text-rose-600 rounded-xl font-semibold hover:bg-rose-50 transition-colors">
                View Rank
              </button>
            </div>
          </div>
        </div>

        {/* Point Conversion Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Point Conversion
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {redemptionOptions.map((option) => (
              <div
                key={option.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-rose-50 rounded-2xl flex items-center justify-center">
                    {option.icon}
                  </div>
                </div>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {option.sol} SOL
                  </div>
                  <div className="text-sm text-gray-600">
                    {option.points} Points Required
                  </div>
                </div>
                <button
                  onClick={() => handleRedeem(option)}
                  disabled={isRedeeming || points < option.points}
                  className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                    points < option.points
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-rose-600 text-white hover:bg-rose-700"
                  }`}
                >
                  {isRedeeming ? "Processing..." : "Redeem Now"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Redemptions Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Recent Redemptions
            </h2>
            <button className="text-rose-600 font-semibold hover:text-rose-700">
              View All History
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                    Points Used
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                    SOL Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {redemptionHistory.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <Wallet className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-gray-900 font-semibold mb-1">
                            No redemptions yet
                          </p>
                          <p className="text-sm text-gray-500">
                            Complete missions to earn points, then redeem them
                            for SOL
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  redemptionHistory.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {item.points} pts
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-rose-600">
                        {item.sol} SOL
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            item.status,
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
