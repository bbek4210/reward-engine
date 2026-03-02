"use client";

import { useState } from "react";
import Pill from "../ui/Pill";
import { cn } from "@/lib/utils";
import type { CitizenLeaderboard } from "@/types";

export interface CitizenLeaderboardListProps {
  entries: CitizenLeaderboard[];
  maxEntries?: number;
}

function truncateAddress(addr: string) {
  if (addr.length <= 12) return addr;
  return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
}

function AddressCell({ address }: { address: string }) {
  const [show, setShow] = useState(false);
  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <span className="font-mono text-sm font-bold text-[#0F172A] cursor-default">
        {truncateAddress(address)}
      </span>
      {show && (
        <span className="absolute left-0 top-full mt-1.5 z-50 whitespace-nowrap bg-gray-900 text-white text-xs font-mono px-3 py-1.5 rounded-lg shadow-lg pointer-events-none">
          {address}
        </span>
      )}
    </span>
  );
}

/**
 * CitizenLeaderboardList Component
 *
 * Design Specs:
 * - White card container
 * - Each row: rank + avatar + name/handle + points pill (purple/indigo) + progress bar
 * - Hover: subtle background highlight
 * - Top 3 ranks have special emoji badges
 *
 * Row Layout:
 * [#1] [Avatar] Aayush Sharma              [2,450 pts]
 *              @aayush
 * =============================================  (progress bar)
 */
export default function CitizenLeaderboardList({
  entries,
  maxEntries = 10,
}: CitizenLeaderboardListProps) {
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
        <h3 className="text-lg font-bold text-[#0F172A]">Top Citizens</h3>
        <p className="text-xs text-[#94A3B8] mt-1">Most active contributors</p>
      </div>

      {/* List */}
      <div className="divide-y divide-[#F1F5F9]">
        {entries.slice(0, maxEntries).map((entry) => {
          const progress = (entry.points / maxPoints) * 100;
          const isTopThree = entry.rank <= 3;

          return (
            <div
              key={entry.id}
              className="relative px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              {/* Progress Bar Background */}
              <div
                className="absolute left-0 top-0 bottom-0 bg-[#EEF2FF] transition-all duration-300 group-hover:bg-[#E0E7FF]"
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

                  {/* Avatar */}
                  <div className="relative shrink-0">
                    {entry.avatar ? (
                      <img
                        src={entry.avatar}
                        alt={entry.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#4F46E5] flex items-center justify-center text-white font-bold ring-2 ring-white">
                        {(entry.walletAddress ?? entry.name)
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Wallet Address & constituency */}
                  <div className="flex-1 min-w-0">
                    {entry.walletAddress ? (
                      <AddressCell address={entry.walletAddress} />
                    ) : (
                      <h4 className="text-base font-bold text-[#0F172A] truncate">
                        {entry.name}
                      </h4>
                    )}
                    <p className="text-xs text-[#94A3B8]">
                      {entry.handle ? `@${entry.handle}` : entry.constituency}
                    </p>
                  </div>
                </div>

                {/* Points */}
                <Pill variant="secondary" size="md" className="shrink-0">
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
