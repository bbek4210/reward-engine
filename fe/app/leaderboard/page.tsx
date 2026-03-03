"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useToast } from "@/contexts/ToastContext";
import { leaderboardApi } from "@/lib/api";
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
 * Fetches live data from the backend API:
 *   GET /api/leaderboard/spotlight
 *   GET /api/leaderboard/constituencies?timeFilter=weekly
 *   GET /api/leaderboard/citizens?timeFilter=weekly
 * Re-fetches whenever the time-filter changes.
 * Citizens list is filtered client-side by the search query.
 */
export default function Leaderboard() {
  const { disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const toast = useToast();

  const [timeFilter, setTimeFilter] = useState<TimeFilter>("weekly");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const [spotlightData, setSpotlightData] = useState<SpotlightType | null>(
    null,
  );
  const [constituencyLeaderboard, setConstituencyLeaderboard] = useState<
    ConstituencyLeaderboard[]
  >([]);
  const [citizenLeaderboard, setCitizenLeaderboard] = useState<
    CitizenLeaderboard[]
  >([]);

  /* ── Fetch leaderboard data whenever the time filter changes ── */
  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [spotlightRes, constituenciesRes, citizensRes] =
          (await Promise.all([
            leaderboardApi.getSpotlight(),
            leaderboardApi.getConstituencies(timeFilter),
            leaderboardApi.getCitizens(undefined, timeFilter),
          ])) as [
            { success: boolean; data: SpotlightType },
            { success: boolean; data: ConstituencyLeaderboard[] },
            { success: boolean; data: CitizenLeaderboard[] },
          ];

        if (cancelled) return;

        if (spotlightRes?.success) setSpotlightData(spotlightRes.data);
        if (constituenciesRes?.success)
          setConstituencyLeaderboard(constituenciesRes.data);
        if (citizensRes?.success) setCitizenLeaderboard(citizensRes.data);
      } catch {
        if (!cancelled) {
          toast("Failed to load leaderboard data. Please try again.", "error");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [timeFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Client-side search filtering ── */
  const filteredCitizens = searchQuery.trim()
    ? citizenLeaderboard.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.handle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.constituency.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : citizenLeaderboard;

  /* ── Wallet handlers ── */
  const handleConnectWallet = () => setVisible(true);

  const handleDisconnectWallet = async () => {
    await disconnect();
  };

  const handleVerifyCitizen = () => {
    toast("Citizen verification coming soon", "info");
  };

  return (
    <div className="min-h-screen bg-[#F7F4F2]">
      {/* Header */}
      <Header
        variant="leaderboard"
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
        onVerifyCitizen={handleVerifyCitizen}
      />

      {/* Main Content */}
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Page Header */}
        <div className="space-y-2 sm:space-y-3">
          <h1 className="text-3xl sm:text-5xl font-bold text-[#0F172A]">
            Leaderboard
          </h1>
          <p className="text-base sm:text-lg text-[#475569] max-w-3xl">
            See who&apos;s leading the civic engagement movement. Track top
            constituencies and citizens making the biggest impact in their
            communities.
          </p>
        </div>

        {/* Controls Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Time Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {(["weekly", "monthly", "all-time"] as TimeFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setTimeFilter(f)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                  timeFilter === f
                    ? "bg-[#E11D48] text-white"
                    : "bg-white border border-[#ECE7E4] text-[#475569] hover:bg-gray-50"
                }`}
              >
                {f === "all-time"
                  ? "All-time"
                  : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Search & Filter */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
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
              className="flex-1 sm:flex-none lg:w-64"
            />
            <Pill
              variant="outline"
              size="md"
              className="cursor-pointer hover:bg-gray-50 hidden sm:inline-flex"
            >
              By Constituency ▾
            </Pill>
            <Pill
              variant="outline"
              size="md"
              className="cursor-pointer hover:bg-gray-50 hidden sm:inline-flex"
            >
              By Category ▾
            </Pill>
          </div>
        </div>

        {/* ── Loading Skeletons ── */}
        {loading ? (
          <div className="space-y-6">
            <div className="h-48 bg-white rounded-2xl animate-pulse" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-96 bg-white rounded-2xl animate-pulse" />
              <div className="h-96 bg-white rounded-2xl animate-pulse" />
            </div>
          </div>
        ) : (
          <>
            {/* Constituency Spotlight */}
            {spotlightData && (
              <ConstituencySpotlight
                data={spotlightData}
                onViewMissions={(constituency) =>
                  console.log("View missions for:", constituency)
                }
              />
            )}

            {/* Leaderboard Lists (Two Columns) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Top Constituencies */}
              <ConstituencyLeaderboardList entries={constituencyLeaderboard} />

              {/* Right: Top Citizens (filtered by search) */}
              <CitizenLeaderboardList entries={filteredCitizens} />
            </div>

            {/* Load More Button */}
            <div className="flex justify-center pt-4">
              <Button variant="outline" size="lg">
                Load More Rankings
              </Button>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-[#ECE7E4]">
        <div className="max-w-[1280px] mx-auto px-6 text-center text-sm text-[#94A3B8]">
          © 2026 Janamat Rewards Engine. Building civic engagement through
          meaningful participation.
        </div>
      </footer>
    </div>
  );
}
