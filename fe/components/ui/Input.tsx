import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

/**
 * Input Component
 *
 * Design Specs:
 * - Background: White
 * - Border: 1px solid #ECE7E4
 * - Border Radius: 12px (rounded-xl)
 * - Focus: Red ring, subtle shadow
 * - Padding: Generous for touch targets
 *
 * Tailwind Classes:
 * bg-white border border-[#ECE7E4] rounded-xl px-4 py-3 text-base
 * focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:ring-opacity-20
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      icon,
      iconPosition = "left",
      fullWidth = false,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "bg-white border border-[#ECE7E4] rounded-xl text-base text-[#0F172A] placeholder:text-[#94A3B8] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:ring-opacity-20 focus:border-[#E11D48] disabled:opacity-50 disabled:cursor-not-allowed";

    const paddingClasses = icon
      ? iconPosition === "left"
        ? "pl-12 pr-4 py-3"
        : "pl-4 pr-12 py-3"
      : "px-4 py-3";

    const widthClass = fullWidth ? "w-full" : "";

    if (icon) {
      return (
        <div className={cn("relative", widthClass)}>
          {iconPosition === "left" && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={cn(baseClasses, paddingClasses, "w-full", className)}
            {...props}
          />
          {iconPosition === "right" && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
              {icon}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        ref={ref}
        type={type}
        className={cn(baseClasses, paddingClasses, widthClass, className)}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
