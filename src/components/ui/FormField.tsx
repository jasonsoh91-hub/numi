import React from "react";

interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "date" | "tel";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error,
  className = "",
}: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label
        htmlFor={name}
        className="text-sm font-medium text-text-secondary"
      >
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`
          w-full
          bg-cosmic-black/80
          border ${error ? "border-red-500" : "border-gold-glow"}
          rounded-xl
          px-4 py-3
          text-text-primary
          placeholder:text-text-muted
          focus:outline-none
          focus:border-gold/60
          focus:ring-2 focus:ring-gold-glow
          transition-all duration-200
        `}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
