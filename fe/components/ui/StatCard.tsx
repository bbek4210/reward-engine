import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  highlight?: boolean;
  icon?: React.ReactNode;
}

/**
 * StatCard Component
 * Small card displaying a single metric
 *
 * Design Specs:
 * - Compact white card
 * - Label: uppercase, small, muted
 * - Value: large, bold, optional red highlight
 * - Used in dashboard stats row
 *
 * Tailwind Classes:
 * bg-white rounded-2xl border border-[#ECE7E4] shadow-card p-6
 * Label: text-xs uppercase text-[#94A3B8] font-semibold tracking-wider
 * Value: text-3xl font-bold text-[#0F172A] or text-[#E11D48]
 */
export default function StatCard({
  label,
  value,
  highlight = false,
  icon,
  className,
  ...props
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-[#ECE7E4] shadow-[0_10px_30px_rgba(16,24,40,0.08)] p-6 transition-all duration-200 hover:shadow-[0_10px_30px_rgba(16,24,40,0.12)]",
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs uppercase text-[#94A3B8] font-semibold tracking-wider mb-2">
            {label}
          </p>
          <p
            className={cn(
              "text-3xl font-bold",
              highlight ? "text-[#E11D48]" : "text-[#0F172A]",
            )}
          >
            {value}
          </p>
        </div>
        {icon && <div className="text-[#94A3B8]">{icon}</div>}
      </div>
    </div>
  );
}
