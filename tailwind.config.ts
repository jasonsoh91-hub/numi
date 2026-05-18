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
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        heading: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        // NUMI Cosmic Backgrounds
        cosmic: {
          black: "#050507",
          navy: "#090D1A",
          blue: "#0B1020",
        },
        // NUMI Gold Accents
        gold: {
          DEFAULT: "#D8B86A",
          50: "#FEF9E7",
          100: "#FDF0D1",
          200: "#F9E2A6",
          300: "#F4D47A",
          400: "#D8B86A",
          500: "#B89A4E",
          600: "#9A7E3F",
          700: "#7A6431",
          800: "#5C4A24",
          900: "#3E3118",
          950: "#20180C",
          bright: "#F4D47A",
          champagne: "#E9D8A6",
          glow: "rgba(216, 184, 106, 0.24)",
        },
        // NUMI Purple Gradient System
        purple: {
          numi: "#8B5CF6",
          electric: "#A78BFA",
          deep: "#312E81",
          glow: "rgba(139, 92, 246, 0.32)",
        },
        // Text Colors
        text: {
          primary: "#F8F7F2",
          secondary: "#B7B7C6",
          muted: "#6F7285",
        },
        // Legacy colors (keep for compatibility)
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
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-cosmic": "radial-gradient(ellipse at top, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(216, 184, 106, 0.1) 0%, transparent 50%)",
        "gradient-gold": "linear-gradient(135deg, #D8B86A 0%, #F4D47A 50%, #D8B86A 100%)",
        "gradient-purple-gold": "linear-gradient(135deg, #8B5CF6 0%, #D8B86A 100%)",
        "gradient-void": "linear-gradient(180deg, #050507 0%, #090D1A 50%, #0B1020 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 40px rgba(216, 184, 106, 0.24)",
        "gold-glow-lg": "0 0 60px rgba(216, 184, 106, 0.32)",
        "purple-glow": "0 0 40px rgba(139, 92, 246, 0.32)",
        "cosmic": "0 8px 32px rgba(0, 0, 0, 0.4)",
        "cosmic-lg": "0 16px 64px rgba(0, 0, 0, 0.5)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-slower": "float 12s ease-in-out infinite",
        "float-up": "floatUp 4s ease-in-out infinite",
        "drift": "drift 10s ease-in-out infinite",
        "ring-expand": "ringExpand 5s ease-out infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
        "shimmer": "shimmer 2s linear infinite",
        "ambient-drift": "ambientDrift 20s ease-in-out infinite alternate",
        "ambient-drift-slow": "ambientDrift 30s ease-in-out infinite alternate",
        "breathing": "breathing 8s ease-in-out infinite",
        "gentle-rotate": "gentleRotate 16s ease-in-out infinite alternate",
        "parallax-slow": "parallaxSlow 25s ease-in-out infinite",
        "parallax-slower": "parallaxSlower 35s ease-in-out infinite",
        "fog-drift": "fogDrift 18s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        floatUp: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-15px) translateX(5px)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(3px, -3px)" },
          "50%": { transform: "translate(-2px, 2px)" },
          "75%": { transform: "translate(2px, -2px)" },
        },
        ringExpand: {
          "0%": { transform: "scale(0.8)", opacity: "0.15" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
        glow: {
          "0%": { opacity: "0.6", boxShadow: "0 0 20px rgba(216, 184, 106, 0.24)" },
          "100%": { opacity: "1", boxShadow: "0 0 40px rgba(216, 184, 106, 0.4)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        ambientDrift: {
          "0%": { transform: "translate(0, 0) scale(1)", opacity: "0.3" },
          "50%": { transform: "translate(30px, -20px) scale(1.1)", opacity: "0.5" },
          "100%": { transform: "translate(-30px, 20px) scale(0.95)", opacity: "0.3" },
        },
        breathing: {
          "0%, 100%": { transform: "scale(1) translateY(0px)", opacity: "1" },
          "50%": { transform: "scale(1.02) translateY(-8px)", opacity: "0.95" },
        },
        gentleRotate: {
          "0%": { transform: "perspective(1000px) rotateY(-2deg) translateY(0px)" },
          "100%": { transform: "perspective(1000px) rotateY(2deg) translateY(-10px)" },
        },
        parallaxSlow: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-15px, 10px)" },
        },
        parallaxSlower: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(8px, -6px)" },
        },
        fogDrift: {
          "0%": { transform: "translateX(-5%) scaleX(1)", opacity: "0.08" },
          "100%": { transform: "translateX(5%) scaleX(1.1)", opacity: "0.12" },
        },
      },
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
