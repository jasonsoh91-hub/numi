import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

export function Section({ children, className = "", id, fullWidth = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-[72px] md:py-[96px] lg:py-[140px] ${fullWidth ? "" : "px-4"} ${className}`}
    >
      {children}
    </section>
  );
}

interface ContainerProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Container({ children, size = "lg", className = "" }: ContainerProps) {
  const sizeStyles = {
    sm: "max-w-3xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
  };

  return (
    <div className={`mx-auto px-4 ${sizeStyles[size]} ${className}`}>
      {children}
    </div>
  );
}
