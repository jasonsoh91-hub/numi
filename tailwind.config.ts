import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-raleway)", "system-ui", "sans-serif"],
        serif: ["var(--font-lora)", "Georgia", "serif"],
      },
      colors: {
        // Premium dark theme
        void: {
          950: "#050505",
          900: "#0a0a0a",
          800: "#0f0f0f",
          700: "#1a1a1a",
          600: "#252525",
        },
        charcoal: {
          950: "#0c0c0c",
          900: "#111111",
          800: "#1a1a1a",
          700: "#2d2d2d",
          600: "#404040",
          500: "#525252",
          400: "#737373",
          300: "#a3a3a3",
          200: "#d4d4d4",
          100: "#e5e5e5",
          50: "#fafafa",
        },
        gold: {
          950: "#1a1400",
          900: "#2d2400",
          800: "#453600",
          700: "#614d00",
          600: "#857000",
          500: "#a68a00",
          400: "#c9a900",
          300: "#e6c800",
          200: "#fde047",
          100: "#fef9c3",
          50: "#fefce8",
          DEFAULT: "#D4AF37",
        },
        crimson: {
          950: "#1a0505",
          900: "#2d0a0a",
          800: "#451111",
          700: "#611a1a",
          600: "#852626",
          500: "#a93636",
          400: "#cc4a4a",
          300: "#ea5f5f",
          200: "#fca5a5",
          100: "#fee2e2",
          50: "#fef2f2",
          DEFAULT: "#DC143C",
        },
        mystic: {
          purple: "#4a1c6b",
          indigo: "#1e3a5f",
          teal: "#0d4f4f",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-void": "linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #0f0f0f 100%)",
        "gradient-mystic": "linear-gradient(135deg, #1a1400 0%, #1a0505 50%, #1a1400 100%)",
        "gradient-gold": "linear-gradient(135deg, #D4AF37 0%, #FDE047 50%, #D4AF37 100%)",
        "gradient-crimson": "linear-gradient(135deg, #DC143C 0%, #EA5F5F 50%, #DC143C 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 40px rgba(212, 175, 55, 0.3)",
        "crimson-glow": "0 0 40px rgba(220, 20, 60, 0.3)",
        "mystic-glow": "0 0 60px rgba(74, 28, 107, 0.2)",
        "premium": "0 8px 32px rgba(0, 0, 0, 0.4)",
        "premium-lg": "0 16px 64px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glow: {
          "0%": { opacity: "0.5" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
