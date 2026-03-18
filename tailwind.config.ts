import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Google Brand Colors
        "g-blue": "#4285F4",
        "g-red": "#EA4335",
        "g-yellow": "#FBBC05",
        "g-green": "#34A853",
        // Dark Theme
        "dark-bg": "#050505",
        "dark-card": "#0D0D0D",
        "dark-border": "rgba(255,255,255,0.08)",
        "dark-surface": "#111111",
        // Glow
        "glow-blue": "rgba(66,133,244,0.4)",
        "glow-red": "rgba(234,67,53,0.4)",
        "glow-green": "rgba(52,168,83,0.4)",
        "glow-yellow": "rgba(251,188,5,0.4)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "Consolas", "monospace"],
        heading: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glass": "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out",
        "counter": "counter 2s ease-out",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        "blue-glow": "0 0 30px rgba(66,133,244,0.3), 0 0 60px rgba(66,133,244,0.1)",
        "red-glow": "0 0 30px rgba(234,67,53,0.3)",
        "green-glow": "0 0 30px rgba(52,168,83,0.3)",
        "yellow-glow": "0 0 30px rgba(251,188,5,0.3)",
        "glass": "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
