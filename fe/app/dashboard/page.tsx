"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePhantomWallet } from "@/hooks/usePhantomWallet";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/contexts/ToastContext";
import Header from "@/components/layout/Header";
import ActiveMissionCard from "@/components/mission/ActiveMissionCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import MissionModal from "@/components/mission/MissionModal";
import { getMissionProgress, incrementMissionProgress } from "@/lib/storage";
import { missionApi } from "@/lib/api";

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
  route?: string;
  actions?: Array<{
    id: string;
    type:
      | "vote"
      | "comment"
      | "proposal"
      | "upload"
      | "survey"
      | "share"
      | "referral";
    label: string;
    points: number;
    icon: string;
  }>;
}

/**
 * Dashboard Page - Main user hub for active missions and participation
 */
export default function Dashboard() {
  const wallet = usePhantomWallet();
  const { addPoints } = useUser();
  const router = useRouter();
  const toast = useToast();
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [selectedConstituency, setSelectedConstituency] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeMissions, setActiveMissions] = useState<ActiveMission[]>([]);
  const [loading, setLoading] = useState(true);
  const [constituencies, setConstituencies] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
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

  useEffect(() => {
    const loadMissions = async () => {
      setLoading(true);
      try {
        const [tasksRes, metaRes] = await Promise.all([
          missionApi.getTasks(),
          missionApi.getMeta(),
        ]);

        if (tasksRes.success && tasksRes.data) {
          const tasks = tasksRes.data as ActiveMission[];
          const savedProgress = getMissionProgress();
          const withProgress = tasks.map((m) => {
            const current = Math.min(
              savedProgress[m.id] ?? 0,
              m.progress.total,
            );
            return {
              ...m,
              progress: {
                ...m.progress,
                current,
                percentage: Math.round((current / m.progress.total) * 100),
              },
            };
          });
          setActiveMissions(withProgress);
        }

        if (metaRes.success && metaRes.data) {
          const meta = metaRes.data as {
            constituencies: string[];
            categories: string[];
          };
          setConstituencies(meta.constituencies);
          setCategories(meta.categories);
        }
      } catch {
        // Ignore — missions will be empty
      } finally {
        setLoading(false);
      }
    };
    loadMissions();
  }, []);

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

  const handleCompleteMission = (missionId: string) => {
    if (!wallet.connected) {
      toast("Please connect your wallet first", "warning");
      return;
    }
    const mission = activeMissions.find((m) => m.id === missionId);
    if (mission?.route) {
      router.push(mission.route);
      return;
    }
    setSelectedMission(missionId);
  };

  const handleCompleteAction = async (actionId: string, points: number) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Award points
    addPoints(points);

    // Persist progress
    if (selectedMission) incrementMissionProgress(selectedMission);

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

  // Filter missions based on active tab
  const filteredMissions = activeMissions.filter((mission) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "easy") return mission.difficulty === "EASY";
    if (activeFilter === "high-impact")
      return mission.difficulty === "HIGH IMPACT";
    if (activeFilter === "streak")
      return mission.recurring === "daily" || mission.recurring === "weekly";
    if (activeFilter === "referral")
      return mission.actions?.some((a) => a.type === "referral") ?? false;
    return true;
  });

  // Mission actions for the modal come from the selected mission's own action list
  const selectedMissionData = activeMissions.find(
    (m) => m.id === selectedMission,
  );
  const missionActions = selectedMissionData?.actions ?? [];

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
                {constituencies.map((c) => (
                  <option key={c} value={c.toLowerCase()}>
                    {c.charAt(0) + c.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
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
            ) : filteredMissions.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No missions found for this filter.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMissions.map((mission) => (
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
