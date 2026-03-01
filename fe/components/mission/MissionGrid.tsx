"use client";

import MissionCard from "./MissionCard";
import type { Mission } from "@/types";

export interface MissionGridProps {
  missions: Mission[];
  onStart?: (missionId: string) => void;
  onViewDetails?: (missionId: string) => void;
}

/**
 * MissionGrid Component
 *
 * Design Specs:
 * - Responsive grid layout
 * - Desktop: 2 columns with gap
 * - Tablet: 1 column
 * - Mobile: 1 column, compact padding
 *
 * Tailwind Classes:
 * grid grid-cols-1 lg:grid-cols-2 gap-6
 */
export default function MissionGrid({
  missions,
  onStart,
  onViewDetails,
}: MissionGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {missions.map((mission) => (
        <MissionCard
          key={mission.id}
          mission={mission}
          onStart={onStart}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
