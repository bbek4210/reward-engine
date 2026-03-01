import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  active?: boolean;
}

/**
 * IconButton Component
 * Circular button for icons only
 *
 * Design Specs:
 * - Circular shape (rounded-full)
 * - Compact size
 * - Used for filter, sort, notification icons
 *
 * Tailwind Classes:
 * Default: bg-white border border-[#ECE7E4] hover:bg-gray-50
 * Ghost: hover:bg-gray-100
 */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      active = false,
      children,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "rounded-full inline-flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

    const variantClasses = {
      default: active
        ? "bg-[#E11D48] text-white shadow-sm"
        : "bg-white border border-[#ECE7E4] text-[#475569] hover:bg-gray-50 hover:border-[#CBD5E1]",
      outline: active
        ? "bg-[#E11D48] text-white"
        : "bg-transparent border border-[#ECE7E4] text-[#475569] hover:bg-gray-50",
      ghost: active
        ? "bg-[#E11D48] text-white"
        : "bg-transparent text-[#475569] hover:bg-gray-100",
    };

    const sizeClasses = {
      sm: "w-8 h-8 text-sm",
      md: "w-10 h-10 text-base",
      lg: "w-12 h-12 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

IconButton.displayName = "IconButton";

export default IconButton;
