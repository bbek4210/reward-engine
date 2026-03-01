import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface PillProps extends HTMLAttributes<HTMLDivElement> {
  variant?:
    | "primary"
    | "secondary"
    | "active"
    | "category"
    | "neutral"
    | "outline";
  size?: "sm" | "md" | "lg";
  dot?: boolean;
  dotColor?: string;
}

/**
 * Pill Component (Rounded Badge/Tag)
 *
 * Design Specs:
 * - Border Radius: Full (rounded-full)
 * - Compact padding
 * - Various color schemes based on variant
 *
 * Variants:
 * - primary: Red background (#E11D48), white text
 * - secondary: Indigo background, white text
 * - active: Light green bg (#DCFCE7), green text, green dot
 * - category: Light pink bg (#FFF1F2), red text
 * - neutral: Light gray bg, dark text
 * - outline: White bg, border, dark text
 *
 * Tailwind Examples:
 * Primary: bg-[#E11D48] text-white px-4 py-2 rounded-full text-sm font-medium
 * Active: bg-[#DCFCE7] text-[#166534] px-3 py-1 rounded-full text-xs font-medium
 */
const Pill = forwardRef<HTMLDivElement, PillProps>(
  (
    {
      className,
      variant = "neutral",
      size = "md",
      dot = false,
      dotColor,
      children,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "rounded-full inline-flex items-center gap-1.5 font-medium whitespace-nowrap";

    const variantClasses = {
      primary: "bg-[#E11D48] text-white",
      secondary: "bg-[#6366F1] text-white",
      active: "bg-[#DCFCE7] text-[#166534]",
      category: "bg-[#FFF1F2] text-[#E11D48]",
      neutral: "bg-gray-100 text-gray-700",
      outline: "bg-white border border-[#ECE7E4] text-gray-700",
    };

    const sizeClasses = {
      sm: "px-3 py-1 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-2.5 text-base",
    };

    const defaultDotColor = variant === "active" ? "#22C55E" : dotColor;

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {dot && (
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: defaultDotColor || "currentColor" }}
          />
        )}
        {children}
      </div>
    );
  },
);

Pill.displayName = "Pill";

export default Pill;
