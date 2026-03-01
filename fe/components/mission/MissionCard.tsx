"use client";

import Card from "../ui/Card";
import Pill from "../ui/Pill";
import Button from "../ui/Button";
import type { Mission } from "@/types";

export interface MissionCardProps {
  mission: Mission;
  onStart?: (missionId: string) => void;
  onViewDetails?: (missionId: string) => void;
}

/**
 * MissionCard Component (Core Dashboard Element)
 *
 * Design Specs:
 * - White card with rounded corners (rounded-2xl)
 * - Top: large banner block (~40% height) with pastel color
 * - Constituency pill overlaid on banner (top-left)
 * - Badge row under banner: Active + Country + Category pills
 * - Title: bold, large (text-xl)
 * - Description: 2 lines max, muted text
 * - Action rows: icon + label + points (right-aligned, red)
 * - Bottom: two buttons (Start solid red + View Details outline)
 *
 * Layout Structure:
 * +----------------------------------+
 * |  Banner (pastel color)           |
 * |  [Constituency Pill]             |
 * +----------------------------------+
 * | [Active] [Nepal] [Category]      |
 * | Title                             |
 * | Description...                    |
 * |                                   |
 * | 🗳️ Vote              +150 pts    |
 * | 💬 Comment           +50 pts     |
 * | 📝 Proposal          +100 pts    |
 * |                                   |
 * | [Start] [View Details]            |
 * +----------------------------------+
 */
export default function MissionCard({
  mission,
  onStart,
  onViewDetails,
}: MissionCardProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      health: { bg: "#FFF1F2", text: "#E11D48" },
      education: { bg: "#EEF2FF", text: "#6366F1" },
      infrastructure: { bg: "#FEF3C7", text: "#92400E" },
      environment: { bg: "#DCFCE7", text: "#166534" },
      governance: { bg: "#F3E8FF", text: "#7C3AED" },
      social: { bg: "#FFE4E6", text: "#E11D48" },
    };
    return colors[category] || colors.governance;
  };

  const categoryColors = getCategoryColor(mission.category);

  return (
    <Card padding="none" hover className="overflow-hidden">
      {/* Banner Section */}
      <div
        className="relative h-32 rounded-t-2xl flex items-start justify-start p-4"
        style={{ backgroundColor: mission.bannerColor }}
      >
        <Pill variant="primary" size="sm" className="shadow-sm">
          {mission.constituency}
        </Pill>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Badge Row */}
        <div className="flex items-center gap-2 flex-wrap">
          <Pill variant="active" size="sm" dot>
            {mission.status.charAt(0).toUpperCase() + mission.status.slice(1)}
          </Pill>
          <Pill variant="neutral" size="sm">
            {mission.country}
          </Pill>
          <Pill
            size="sm"
            className="font-medium"
            style={{
              backgroundColor: categoryColors.bg,
              color: categoryColors.text,
            }}
          >
            {mission.category.charAt(0).toUpperCase() +
              mission.category.slice(1)}
          </Pill>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[#0F172A] leading-tight">
          {mission.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#475569] line-clamp-2">
          {mission.description}
        </p>

        {/* Actions List */}
        <div className="space-y-2 py-2">
          {mission.actions.slice(0, 4).map((action) => (
            <div
              key={action.id}
              className="flex items-center justify-between py-2 border-b border-[#F1F5F9] last:border-0"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{action.icon}</span>
                <span className="text-sm font-medium text-[#475569]">
                  {action.label}
                </span>
              </div>
              <span className="text-sm font-bold text-[#E11D48]">
                +{action.points} pts
              </span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            variant="primary"
            size="md"
            className="flex-1"
            onClick={() => onStart?.(mission.id)}
          >
            Start
          </Button>
          <Button
            variant="outline"
            size="md"
            className="flex-1"
            onClick={() => onViewDetails?.(mission.id)}
          >
            View Details
          </Button>
        </div>

        {/* Participants */}
        {mission.totalParticipants > 0 && (
          <div className="text-xs text-[#94A3B8] text-center pt-2">
            {mission.totalParticipants.toLocaleString()} participants
          </div>
        )}
      </div>
    </Card>
  );
}
