import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF7",
        ink: "#0F0F0D",
        forest: "#1B4332",
        danger: "#9B2C2C",
        warning: "#92400E",
        border: "#E5E0D5",
        secondary: "#6B6B5E"
      },
      boxShadow: {
        subtle: "0 10px 20px rgba(15, 15, 13, 0.06)",
      },
      animation: {
        fadeIn: "fadeIn .6s ease-out both",
        pulseSoft: "pulseSoft 2s ease-in-out infinite"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        pulseSoft: {
          "0%,100%": { opacity: "0.45" },
          "50%": { opacity: "1" }
        }
      }
    },
  },
  plugins: [],
};

export default config;
