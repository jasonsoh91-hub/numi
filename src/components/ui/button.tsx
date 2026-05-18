import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "default";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantStyles = {
      primary:
        "bg-gradient-to-r from-gold to-gold-bright text-cosmic-black shadow-lg shadow-gold-glow hover:shadow-gold-glow/50 hover:scale-105 active:scale-[1.02]",
      secondary:
        "bg-transparent border border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/60",
      ghost: "bg-transparent text-text-primary hover:text-gold",
      outline: "bg-transparent border border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/60",
      default:
        "bg-gradient-to-r from-gold to-gold-bright text-cosmic-black shadow-lg shadow-gold-glow hover:shadow-gold-glow/50 hover:scale-105 active:scale-[1.02]",
    };

    const sizeStyles = {
      sm: "px-6 py-2.5 text-sm",
      md: "px-8 py-4 text-base",
      lg: "px-10 py-5 text-lg",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? "w-full" : ""} ${className}`}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
