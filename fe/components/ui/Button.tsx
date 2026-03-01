import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
}

/**
 * Button Component
 *
 * Variants:
 * - primary: Solid red background (#E11D48), white text
 * - secondary: Solid indigo background, white text
 * - outline: White background, border, colored text
 * - ghost: Transparent background, colored text
 *
 * Tailwind Classes:
 * Primary: bg-civic-primary hover:bg-civic-primary-hover text-white
 * Outline: bg-white border-2 border-civic-border hover:bg-gray-50
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "rounded-full font-semibold transition-all duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
      primary:
        "bg-[#E11D48] hover:bg-[#BE123C] text-white shadow-sm hover:shadow-md active:scale-95",
      secondary:
        "bg-[#6366F1] hover:bg-[#4F46E5] text-white shadow-sm hover:shadow-md active:scale-95",
      outline:
        "bg-white border-2 border-[#ECE7E4] text-[#0F172A] hover:bg-gray-50 hover:border-[#CBD5E1] active:scale-95",
      ghost: "bg-transparent text-[#475569] hover:bg-gray-100 active:scale-95",
    };

    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          widthClass,
          className,
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
