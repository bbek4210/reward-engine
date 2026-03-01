"use client";

import { useState, useEffect } from "react";
import { usePhantomWallet } from "@/hooks/usePhantomWallet";
import { useUser } from "@/contexts/UserContext";
import Header from "@/components/layout/Header";
import ActiveMissionCard from "@/components/mission/ActiveMissionCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import MissionModal from "@/components/mission/MissionModal";

type FilterTab = "all" | "easy" | "streak" | "high-impact" | "referral";

interface ActiveMission {
  id: string;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HIGH IMPACT";
  resetTime: string;
  progress: {
    current: number;
    total: number;
    percentage: number;
  };
  points: number;
  recurring: "daily" | "weekly" | "monthly";
}

/**
 * Dashboard Page - Main user hub for active missions and participation
 */
export default function Dashboard() {
  const wallet = usePhantomWallet();
  const { addPoints } = useUser();
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [selectedConstituency, setSelectedConstituency] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeMissions, setActiveMissions] = useState<ActiveMission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMission, setSelectedMission] = useState<string | null>(null);
  const [recentActivities, setRecentActivities] = useState<
    Array<{
      id: string;
      type: "vote" | "comment" | "proposal" | "referral";
      description: string;
      location?: string;
      time: string;
    }>
  >([]);

  // Active missions - Start fresh with 0 progress
  const mockActiveMissions: ActiveMission[] = [
    {
      id: "1",
      title: "Weekly Voter Participation",
      difficulty: "MEDIUM",
      resetTime: "in 3 days",
      progress: { current: 0, total: 5, percentage: 0 },
      points: 15,
      recurring: "weekly",
    },
    {
      id: "2",
      title: "Community Referral Milestone",
      difficulty: "HIGH IMPACT",
      resetTime: "Monthly",
      progress: { current: 0, total: 10, percentage: 0 },
      points: 50,
      recurring: "monthly",
    },
    {
      id: "3",
      title: "Daily Opinion Pulse",
      difficulty: "EASY",
      resetTime: "daily",
      progress: { current: 0, total: 1, percentage: 0 },
      points: 5,
      recurring: "daily",
    },
    {
      id: "4",
      title: "Monthly Health Survey",
      difficulty: "MEDIUM",
      resetTime: "in 15 days",
      progress: { current: 0, total: 3, percentage: 0 },
      points: 25,
      recurring: "monthly",
    },
  ];

  useEffect(() => {
    // Simulate loading missions from API
    const loadMissions = async () => {
      setLoading(true);
      // In production, fetch from API
      // const result = await missionApi.getAll({ status: 'active' });
      setTimeout(() => {
        setActiveMissions(mockActiveMissions);
        setLoading(false);
      }, 500);
    };

    loadMissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleCompleteMission = (missionId: string) => {
    if (!wallet.connected) {
      alert("Please connect your wallet first");
      return;
    }
    setSelectedMission(missionId);
  };

  const handleCompleteAction = async (actionId: string, points: number) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Award points
    addPoints(points);

    // Add to recent activity
    const newActivity = {
      id: Date.now().toString(),
      type: "vote" as const,
      description: "Completed action in",
      location: selectedMission || "Mission",
      time: "Just now",
    };
    setRecentActivities([newActivity, ...recentActivities.slice(0, 4)]);

    // Update mission progress
    setActiveMissions((prev) =>
      prev.map((mission) => {
        if (mission.id === selectedMission) {
          const newCurrent = Math.min(
            mission.progress.current + 1,
            mission.progress.total,
          );
          return {
            ...mission,
            progress: {
              ...mission.progress,
              current: newCurrent,
              percentage: Math.round(
                (newCurrent / mission.progress.total) * 100,
              ),
            },
          };
        }
        return mission;
      }),
    );
  };

  const filterTabs = [
    { id: "all" as FilterTab, label: "All" },
    { id: "easy" as FilterTab, label: "Easy" },
    { id: "streak" as FilterTab, label: "Streak" },
    { id: "high-impact" as FilterTab, label: "High Impact" },
    { id: "referral" as FilterTab, label: "Referral" },
  ];

  // Mission actions for the modal
  const missionActions = [
    {
      id: "action-1",
      type: "vote" as const,
      label: "Vote on Priority Issues",
      points: 150,
      icon: "🗳️",
    },
    {
      id: "action-2",
      type: "comment" as const,
      label: "Share Your Opinion",
      points: 50,
      icon: "💬",
    },
    {
      id: "action-3",
      type: "proposal" as const,
      label: "Submit a Proposal",
      points: 100,
      icon: "📝",
    },
    {
      id: "action-4",
      type: "upload" as const,
      label: "Upload Supporting Evidence",
      points: 75,
      icon: "📸",
    },
  ];

  const selectedMissionData = activeMissions.find(
    (m) => m.id === selectedMission,
  );

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
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Left Section - Main Content */}
          <div className="flex-1 space-y-6">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                    activeFilter === tab.id
                      ? "bg-rose-600 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Dropdowns */}
            <div className="flex gap-4">
              <select
                value={selectedConstituency}
                onChange={(e) => setSelectedConstituency(e.target.value)}
                className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="all">All Constituencies</option>
                <option value="kathmandu-3">Kathmandu-3</option>
                <option value="lalitpur-2">Lalitpur-2</option>
                <option value="bhaktapur-1">Bhaktapur-1</option>
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="all">All Categories</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="environment">Environment</option>
                <option value="governance">Governance</option>
              </select>
            </div>

            {/* Active Missions Header */}
            <h2 className="text-2xl font-bold text-gray-900">
              Active Missions
            </h2>

            {/* Mission Cards */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-4 border-rose-600 border-t-transparent rounded-full animate-spin" />
                <p className="mt-4 text-gray-600">Loading missions...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeMissions.map((mission) => (
                  <ActiveMissionCard
                    key={mission.id}
                    title={mission.title}
                    difficulty={mission.difficulty}
                    resetTime={mission.resetTime}
                    progress={mission.progress}
                    points={mission.points}
                    recurring={mission.recurring}
                    onComplete={() => handleCompleteMission(mission.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar - Activity Feed */}
          <div className="w-[380px] hidden lg:block">
            <ActivityFeed activities={recentActivities} />
          </div>
        </div>
      </main>

      {/* Mission Modal */}
      <MissionModal
        isOpen={selectedMission !== null}
        onClose={() => setSelectedMission(null)}
        title={selectedMissionData?.title || "Complete Mission"}
        actions={missionActions}
        onCompleteAction={handleCompleteAction}
      />
    </div>
  );
}
