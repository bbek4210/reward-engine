"use client";

import Pill from "../ui/Pill";
import { cn } from "@/lib/utils";
import type { ConstituencyLeaderboard } from "@/types";

export interface ConstituencyLeaderboardListProps {
  entries: ConstituencyLeaderboard[];
  maxEntries?: number;
}

/**
 * ConstituencyLeaderboardList Component
 *
 * Design Specs:
 * - White card container
 * - Each row: rank pill + name + points pill (red) + progress bar
 * - Hover: subtle background highlight
 * - Top 3 ranks have special styling (gold, silver, bronze badges)
 *
 * Row Layout:
 * [#1] Kathmandu-3                          [5,842 pts]
 * =============================================  (progress bar)
 */
export default function ConstituencyLeaderboardList({
  entries,
  maxEntries = 10,
}: ConstituencyLeaderboardListProps) {
  const getRankDisplay = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  const maxPoints = Math.max(...entries.map((e) => e.points));

  return (
    <div className="bg-white rounded-2xl border border-[#ECE7E4] shadow-card overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#ECE7E4] bg-gray-50">
        <h3 className="text-lg font-bold text-[#0F172A]">Top Constituencies</h3>
        <p className="text-xs text-[#94A3B8] mt-1">By total points earned</p>
      </div>

      {/* List */}
      <div className="divide-y divide-[#F1F5F9]">
        {entries.slice(0, maxEntries).map((entry, index) => {
          const progress = (entry.points / maxPoints) * 100;
          const isTopThree = entry.rank <= 3;

          return (
            <div
              key={entry.id}
              className="relative px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              {/* Progress Bar Background */}
              <div
                className="absolute left-0 top-0 bottom-0 bg-[#FFF1F2] transition-all duration-300 group-hover:bg-[#FFE4E6]"
                style={{ width: `${progress}%` }}
              />

              {/* Content */}
              <div className="relative flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Rank */}
                  <div
                    className={cn(
                      "flex items-center justify-center font-bold text-lg min-w-[3rem]",
                      isTopThree ? "text-2xl" : "text-[#475569]",
                    )}
                  >
                    {getRankDisplay(entry.rank)}
                  </div>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-[#0F172A] truncate">
                      {entry.name}
                    </h4>
                    <p className="text-xs text-[#94A3B8]">
                      {entry.missionsCount} active missions
                    </p>
                  </div>
                </div>

                {/* Points */}
                <Pill variant="primary" size="md" className="shrink-0">
                  {entry.points.toLocaleString()} pts
                </Pill>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
