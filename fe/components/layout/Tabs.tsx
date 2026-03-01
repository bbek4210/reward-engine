"use client";

import { cn } from "@/lib/utils";
import type { TabType } from "@/types";

export interface TabsProps {
  tabs: {
    id: TabType;
    label: string;
    count?: number;
  }[];
  activeTab: TabType;
  onChange: (tab: TabType) => void;
}

/**
 * Tabs Component (Pill Tabs)
 *
 * Design Specs:
 * - Pills: fully rounded tabs
 * - Selected: solid red (#E11D48) with white text
 * - Unselected: white with subtle border
 * - Hover: light gray background
 *
 * Tailwind Classes:
 * Container: flex items-center gap-2 flex-wrap
 * Active: bg-[#E11D48] text-white px-4 py-2 rounded-full font-medium
 * Inactive: bg-white border border-[#ECE7E4] text-[#475569] px-4 py-2 rounded-full hover:bg-gray-50
 */
export default function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 whitespace-nowrap",
              isActive
                ? "bg-[#E11D48] text-white shadow-sm"
                : "bg-white border border-[#ECE7E4] text-[#475569] hover:bg-gray-50 hover:border-[#CBD5E1]",
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={cn(
                  "ml-2 px-2 py-0.5 rounded-full text-xs font-semibold",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-[#475569]",
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
