"use client";

import Link from "next/link";
import {
  BarChart2,
  Flame,
  Trophy,
  CheckSquare,
  Vote,
  Users,
  Gift,
  MessageSquare,
  ChevronRight,
  Star,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";

// Keep the original props interface so the dashboard page doesn't need to change
interface Activity {
  id: string;
  type: "vote" | "comment" | "proposal" | "referral";
  description: string;
  time: string;
  location?: string;
}
interface ActivityFeedProps {
  activities: Activity[];
}

const quickActions = [
  {
    label: "Vote on a Poll",
    description: "Earn 5 pts per vote",
    icon: Vote,
    href: "/polls",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    label: "Leaderboard",
    description: "See where you rank",
    icon: Trophy,
    href: "/leaderboard",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    label: "Refer & Earn",
    description: "Earn 10 pts per referral",
    icon: Users,
    href: "/referral",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    label: "Redeem Points",
    description: "Exchange pts for rewards",
    icon: Gift,
    href: "/redeem",
    color: "text-green-600",
    bg: "bg-green-50",
  },
];

const howToEarn = [
  { action: "Cast a vote", pts: "+5 pts", icon: Vote },
  { action: "Comment on a poll", pts: "+2 pts", icon: MessageSquare },
  { action: "Complete a mission", pts: "+8–20 pts", icon: CheckSquare },
  { action: "Refer a friend", pts: "+10 pts", icon: Users },
];

export default function ActivityFeed({ activities: _ }: ActivityFeedProps) {
  const { points, streak, weeklyRank, missionsCompleted } = useUser();

  const stats = [
    {
      label: "Total Points",
      value: points.toLocaleString(),
      icon: BarChart2,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      label: "Day Streak",
      value: streak > 0 ? `${streak} 🔥` : "0",
      icon: Flame,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      label: "Weekly Rank",
      value: `#${weeklyRank}`,
      icon: Trophy,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Missions Done",
      value: String(missionsCompleted),
      icon: CheckSquare,
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="space-y-4 sticky top-24">
      {/* Stats Card */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-4 h-4 text-rose-600" />
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
            Your Stats
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {stats.map(({ label, value, icon: Icon, color, bg }) => (
            <div
              key={label}
              className={`${bg} rounded-xl p-3 flex items-center gap-3`}
            >
              <Icon className={`w-5 h-5 ${color} flex-shrink-0`} />
              <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className={`text-base font-bold ${color}`}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 className="w-4 h-4 text-rose-600" />
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
            Quick Actions
          </h2>
        </div>
        <div className="space-y-1">
          {quickActions.map(
            ({ label, description, icon: Icon, href, color, bg }) => (
              <Link key={label} href={href}>
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer">
                  <div
                    className={`w-9 h-9 ${bg} rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">
                      {label}
                    </p>
                    <p className="text-xs text-gray-400">{description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                </div>
              </Link>
            ),
          )}
        </div>
      </div>

      {/* How to Earn */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Gift className="w-4 h-4 text-rose-600" />
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
            How to Earn
          </h2>
        </div>
        <div className="space-y-3">
          {howToEarn.map(({ action, pts, icon: Icon }) => (
            <div key={action} className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Icon className="w-4 h-4 text-gray-400" />
                {action}
              </div>
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                {pts}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
