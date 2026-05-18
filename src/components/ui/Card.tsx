import React from "react";

interface CardProps {
  children: React.ReactNode;
  variant?: "glass" | "pattern" | "elevated" | "minimal";
  hover?: boolean;
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = "glass", hover = false, className = "", ...props }, ref) => {
    const variantStyles = {
      glass: "bg-cosmic-navy/60 backdrop-blur-xl border border-gold-glow shadow-2xl",
      pattern: "bg-cosmic-blue/80 backdrop-blur-md border border-gold-glow",
      elevated: "bg-cosmic-blue/90 backdrop-blur-xl border border-gold-glow shadow-cosmic-lg",
      minimal: "bg-transparent border border-white/10",
    };

    const hoverStyles = hover
      ? "hover:scale-[1.02] hover:shadow-gold-glow/20 hover:border-gold/40 transition-all duration-300 cursor-pointer"
      : "";

    return (
      <div
        ref={ref}
        className={`rounded-2xl p-6 ${variantStyles[variant]} ${hoverStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
