"use client";

import { useState } from "react";
import { usePhantomWallet } from "@/hooks/usePhantomWallet";
import Header from "@/components/layout/Header";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Pill from "@/components/ui/Pill";
import ConstituencySpotlight from "@/components/leaderboard/ConstituencySpotlight";
import ConstituencyLeaderboardList from "@/components/leaderboard/ConstituencyLeaderboardList";
import CitizenLeaderboardList from "@/components/leaderboard/CitizenLeaderboardList";
import type {
  TimeFilter,
  ConstituencySpotlight as SpotlightType,
  ConstituencyLeaderboard,
  CitizenLeaderboard,
} from "@/types";

/**
 * Leaderboard Page
 *
 * Layout Structure:
 * - Header with navigation (Missions, Leaderboard, Rewards, Profile)
 * - Page title + subtitle
 * - Time filter pills (Weekly, Monthly, All-time)
 * - Search + filter controls
 * - Constituency spotlight hero card
 * - Two-column leaderboard lists:
 *   - Left: Top Constituencies
 *   - Right: Top Citizens
 * - Load more button
 * - Footer
 */
export default function Leaderboard() {
  const wallet = usePhantomWallet();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("weekly");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - replace with API calls
  const spotlightData: SpotlightType = {
    constituency: "KATHMANDU-3",
    pointsThisWeek: 5842,
    topContributor: "Aayush",
    activeUsers: 342,
    activeMissions: 8,
  };

  const constituencyLeaderboard: ConstituencyLeaderboard[] = [
    {
      rank: 1,
      id: "1",
      name: "Kathmandu-3",
      points: 5842,
      missionsCount: 8,
      type: "constituency",
      progress: 100,
    },
    {
      rank: 2,
      id: "2",
      name: "Lalitpur-2",
      points: 4521,
      missionsCount: 6,
      type: "constituency",
      progress: 77,
    },
    {
      rank: 3,
      id: "3",
      name: "Bhaktapur-1",
      points: 3890,
      missionsCount: 5,
      type: "constituency",
      progress: 67,
    },
    {
      rank: 4,
      id: "4",
      name: "Pokhara-1",
      points: 3654,
      missionsCount: 7,
      type: "constituency",
      progress: 63,
    },
    {
      rank: 5,
      id: "5",
      name: "Kathmandu-1",
      points: 3201,
      missionsCount: 4,
      type: "constituency",
      progress: 55,
    },
    {
      rank: 6,
      id: "6",
      name: "Kathmandu-2",
      points: 2987,
      missionsCount: 5,
      type: "constituency",
      progress: 51,
    },
    {
      rank: 7,
      id: "7",
      name: "Lalitpur-1",
      points: 2654,
      missionsCount: 3,
      type: "constituency",
      progress: 45,
    },
    {
      rank: 8,
      id: "8",
      name: "Biratnagar-1",
      points: 2341,
      missionsCount: 4,
      type: "constituency",
      progress: 40,
    },
    {
      rank: 9,
      id: "9",
      name: "Chitwan-1",
      points: 2108,
      missionsCount: 3,
      type: "constituency",
      progress: 36,
    },
    {
      rank: 10,
      id: "10",
      name: "Dharan-1",
      points: 1876,
      missionsCount: 2,
      type: "constituency",
      progress: 32,
    },
  ];

  const citizenLeaderboard: CitizenLeaderboard[] = [
    {
      rank: 1,
      id: "1",
      name: "Aayush Sharma",
      handle: "aayush",
      points: 2450,
      constituency: "Kathmandu-3",
      type: "citizen",
      streakDays: 15,
      progress: 100,
    },
    {
      rank: 2,
      id: "2",
      name: "Priya Thapa",
      handle: "priyat",
      points: 2210,
      constituency: "Lalitpur-2",
      type: "citizen",
      streakDays: 12,
      progress: 90,
    },
    {
      rank: 3,
      id: "3",
      name: "Rajesh Shrestha",
      handle: "rajeshs",
      points: 1980,
      constituency: "Bhaktapur-1",
      type: "citizen",
      streakDays: 10,
      progress: 81,
    },
    {
      rank: 4,
      id: "4",
      name: "Sita Gurung",
      handle: "sitag",
      points: 1765,
      constituency: "Pokhara-1",
      type: "citizen",
      streakDays: 9,
      progress: 72,
    },
    {
      rank: 5,
      id: "5",
      name: "Bikram Rai",
      handle: "bikramr",
      points: 1654,
      constituency: "Kathmandu-3",
      type: "citizen",
      streakDays: 8,
      progress: 67,
    },
    {
      rank: 6,
      id: "6",
      name: "Maya Tamang",
      handle: "mayat",
      points: 1543,
      constituency: "Kathmandu-1",
      type: "citizen",
      streakDays: 7,
      progress: 63,
    },
    {
      rank: 7,
      id: "7",
      name: "Deepak Adhikari",
      handle: "deepaka",
      points: 1432,
      constituency: "Lalitpur-1",
      type: "citizen",
      streakDays: 6,
      progress: 58,
    },
    {
      rank: 8,
      id: "8",
      name: "Anita Karki",
      handle: "anitak",
      points: 1321,
      constituency: "Biratnagar-1",
      type: "citizen",
      streakDays: 5,
      progress: 54,
    },
    {
      rank: 9,
      id: "9",
      name: "Suresh Magar",
      handle: "sureshm",
      points: 1210,
      constituency: "Chitwan-1",
      type: "citizen",
      streakDays: 4,
      progress: 49,
    },
    {
      rank: 10,
      id: "10",
      name: "Kamala Paudel",
      handle: "kamalap",
      points: 1098,
      constituency: "Dharan-1",
      type: "citizen",
      streakDays: 3,
      progress: 45,
    },
  ];

  const handleConnectWallet = async () => {
    if (!wallet.isPhantomInstalled) {
      alert("Phantom wallet not found. Please install it from phantom.app");
      return;
    }
    await wallet.connect();
  };

  const handleVerifyCitizen = () => {
    alert("Citizen verification flow would start here");
  };

  return (
    <div className="min-h-screen bg-[#F7F4F2]">
      {/* Header */}
      <Header
        variant="leaderboard"
        onConnectWallet={handleConnectWallet}
        onVerifyCitizen={handleVerifyCitizen}
        walletConnected={wallet.connected}
        walletAddress={wallet.address || undefined}
      />

      {/* Main Content */}
      <main className="max-w-[1280px] mx-auto px-6 py-8 space-y-8">
        {/* Page Header */}
        <div className="space-y-3">
          <h1 className="text-5xl font-bold text-[#0F172A]">Leaderboard</h1>
          <p className="text-lg text-[#475569] max-w-3xl">
            See who&apos;s leading the civic engagement movement. Track top
            constituencies and citizens making the biggest impact in their
            communities.
          </p>
        </div>

        {/* Controls Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Time Filter Pills */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTimeFilter("weekly")}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                timeFilter === "weekly"
                  ? "bg-[#E11D48] text-white"
                  : "bg-white border border-[#ECE7E4] text-[#475569] hover:bg-gray-50"
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeFilter("monthly")}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                timeFilter === "monthly"
                  ? "bg-[#E11D48] text-white"
                  : "bg-white border border-[#ECE7E4] text-[#475569] hover:bg-gray-50"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setTimeFilter("all-time")}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                timeFilter === "all-time"
                  ? "bg-[#E11D48] text-white"
                  : "bg-white border border-[#ECE7E4] text-[#475569] hover:bg-gray-50"
              }`}
            >
              All-time
            </button>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <Input
              type="search"
              placeholder="Search citizens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              }
              iconPosition="left"
              className="lg:w-64"
            />
            <Pill
              variant="outline"
              size="md"
              className="cursor-pointer hover:bg-gray-50"
            >
              By Constituency ▾
            </Pill>
            <Pill
              variant="outline"
              size="md"
              className="cursor-pointer hover:bg-gray-50"
            >
              By Category ▾
            </Pill>
          </div>
        </div>

        {/* Constituency Spotlight */}
        <ConstituencySpotlight
          data={spotlightData}
          onViewMissions={(constituency) =>
            console.log("View missions for:", constituency)
          }
        />

        {/* Leaderboard Lists (Two Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Top Constituencies */}
          <ConstituencyLeaderboardList entries={constituencyLeaderboard} />

          {/* Right: Top Citizens */}
          <CitizenLeaderboardList entries={citizenLeaderboard} />
        </div>

        {/* Load More Button */}
        <div className="flex justify-center pt-4">
          <Button variant="outline" size="lg">
            Load More Rankings
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-[#ECE7E4]">
        <div className="max-w-[1280px] mx-auto px-6 text-center text-sm text-[#94A3B8]">
          © 2026 Janamat Rewards. Building civic engagement through meaningful
          participation.
        </div>
      </footer>
    </div>
  );
}
