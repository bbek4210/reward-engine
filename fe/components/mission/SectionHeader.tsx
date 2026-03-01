export interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

/**
 * SectionHeader Component
 *
 * Design Specs:
 * - Section title with optional icon on left
 * - Optional action on right (e.g., "View All" link)
 * - Used to separate content sections
 *
 * Example:
 * 🚀 Featured Missions                View All →
 */
export default function SectionHeader({
  title,
  icon,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        {icon && <span className="text-2xl">{icon}</span>}
        <h2 className="text-2xl font-bold text-[#0F172A]">{title}</h2>
      </div>
      {action && (
        <div className="text-sm font-medium text-[#E11D48] hover:text-[#BE123C] cursor-pointer transition-colors">
          {action}
        </div>
      )}
    </div>
  );
}
