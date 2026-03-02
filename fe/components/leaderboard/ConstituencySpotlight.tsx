"use client";

import Button from "../ui/Button";
import type { ConstituencySpotlight as ConstituencySpotlightType } from "@/types";

export interface ConstituencySpotlightProps {
  data: ConstituencySpotlightType;
  onViewMissions?: (constituency: string) => void;
}

export default function ConstituencySpotlight({
  data,
  onViewMissions,
}: ConstituencySpotlightProps) {
  return (
    <div className="bg-gradient-to-br from-[#E11D48] to-[#BE123C] text-white rounded-2xl p-8 shadow-[0_20px_40px_rgba(225,29,72,0.2)]">
      <div className="flex items-start justify-between gap-8">
        <div className="flex-1 space-y-4">
          {/* Label */}
          <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            Constituency Spotlight
          </div>

          {/* Constituency Name */}
          <h2 className="text-5xl font-bold leading-tight">
            {data.constituency}
          </h2>

          {/* Stats Row */}
          <div className="flex items-center gap-4 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-white/80"
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
              <span className="font-semibold">
                {data.pointsThisWeek.toLocaleString()} points this week
              </span>
            </div>
            <span className="text-white/60">•</span>
            <div>
              <span className="text-white/80">Top Contributor: </span>
              <span className="font-semibold">@{data.topContributor}</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          variant="outline"
          size="md"
          className="bg-white text-[#E11D48] border-white hover:bg-white/90 whitespace-nowrap"
          onClick={() => onViewMissions?.(data.constituency)}
        >
          <span>View Missions</span>
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
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
