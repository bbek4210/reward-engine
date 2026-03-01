import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "sm" | "md" | "lg" | "none";
  hover?: boolean;
  banner?: boolean;
  bannerColor?: string;
}

/**
 * Card Component
 *
 * Design Specs:
 * - Background: White (#FFFFFF)
 * - Border: 1px solid #ECE7E4
 * - Border Radius: 16px (rounded-2xl)
 * - Shadow: 0 10px 30px rgba(16, 24, 40, 0.08)
 * - Hover: Slight lift with increased shadow
 *
 * Tailwind Classes:
 * bg-white rounded-2xl border border-[#ECE7E4] shadow-card
 * hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      padding = "md",
      hover = false,
      banner = false,
      bannerColor,
      children,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "bg-white rounded-2xl border border-[#ECE7E4] transition-all duration-200";

    const shadowClasses = hover
      ? "shadow-[0_10px_30px_rgba(16,24,40,0.08)] hover:shadow-[0_20px_40px_rgba(16,24,40,0.12)] hover:-translate-y-1"
      : "shadow-[0_10px_30px_rgba(16,24,40,0.08)]";

    const paddingClasses = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          shadowClasses,
          paddingClasses[padding],
          className,
        )}
        {...props}
      >
        {banner && bannerColor && (
          <div
            className="absolute top-0 left-0 right-0 h-32 rounded-t-2xl -mt-6 -mx-6"
            style={{ backgroundColor: bannerColor }}
          />
        )}
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

export default Card;
