"use client";

import { useState } from "react";
import { usePhantomWallet } from "@/hooks/usePhantomWallet";
import Header from "@/components/layout/Header";
import SearchBar from "@/components/layout/SearchBar";
import Tabs from "@/components/layout/Tabs";
import StatCard from "@/components/ui/StatCard";
import SectionHeader from "@/components/mission/SectionHeader";
import MissionGrid from "@/components/mission/MissionGrid";
import Button from "@/components/ui/Button";
import type { TabType } from "@/types";
import { mockMissions, mockStats } from "@/lib/mockData";

/**
 * Dashboard Page
 *
 * Layout Structure:
 * - Header (sticky)
 * - Hero section (max-width container)
 * - Search bar
 * - Tabs (filter missions)
 * - Stats cards (4 across)
 * - Featured missions section
 * - Mission grid (2 columns)
 * - Load more button
 *
 * Responsive:
 * - Desktop: 2-column grid, 4 stat cards
 * - Tablet: 1-column grid, 2 stat cards per row
 * - Mobile: 1-column everything, compact padding
 */
export default function Dashboard() {
  const wallet = usePhantomWallet();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("trending");

  const tabs = [
    { id: "trending" as TabType, label: "Trending", count: 12 },
    { id: "new" as TabType, label: "New Missions", count: 8 },
    { id: "constituencies" as TabType, label: "Constituencies", count: 15 },
    { id: "categories" as TabType, label: "Categories", count: 6 },
    { id: "all" as TabType, label: "All" },
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

  const handleMissionStart = (missionId: string) => {
    console.log("Starting mission:", missionId);
    alert(
      `Starting mission ${missionId}. This would navigate to mission details.`,
    );
  };

  const handleMissionDetails = (missionId: string) => {
    console.log("Viewing mission details:", missionId);
    alert(`Viewing details for mission ${missionId}`);
  };

  return (
    <div className="min-h-screen bg-[#F7F4F2]">
      {/* Header */}
      <Header
        variant="dashboard"
        onConnectWallet={handleConnectWallet}
        onVerifyCitizen={handleVerifyCitizen}
        walletConnected={wallet.connected}
        walletAddress={wallet.address || undefined}
      />

      {/* Main Content */}
      <main className="max-w-[1280px] mx-auto px-6 py-8 space-y-8">
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onFilter={() => console.log("Filter clicked")}
          onSort={() => console.log("Sort clicked")}
        />

        {/* Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="YOUR POINTS"
            value={mockStats.yourPoints.toLocaleString()}
            highlight
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            }
          />
          <StatCard
            label="CURRENT STREAK"
            value={`${mockStats.currentStreak} Days`}
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                />
              </svg>
            }
          />
          <StatCard
            label="WEEKLY RANK"
            value={`#${mockStats.weeklyRank}`}
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            }
          />
          <StatCard
            label="MISSIONS COMPLETED"
            value={mockStats.missionsCompleted}
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
        </div>

        {/* Featured Missions Section */}
        <div className="space-y-6">
          <SectionHeader
            title="Featured Missions"
            icon="🚀"
            action={
              <span className="inline-flex items-center gap-1">
                View All
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            }
          />

          <MissionGrid
            missions={mockMissions.filter((m) => m.isFeatured)}
            onStart={handleMissionStart}
            onViewDetails={handleMissionDetails}
          />
        </div>

        {/* All Missions Section */}
        <div className="space-y-6">
          <SectionHeader title="All Missions" icon="📋" />

          <MissionGrid
            missions={mockMissions}
            onStart={handleMissionStart}
            onViewDetails={handleMissionDetails}
          />
        </div>

        {/* Load More Button */}
        <div className="flex justify-center pt-4">
          <Button variant="outline" size="lg">
            Load More Missions
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
