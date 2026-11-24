import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

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
        display: [
          "var(--font-jakarta)",
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      colors: {
        canvas: "#F6F4EF",
        cream: {
          50: "#FAF9F5",
          100: "#F6F4EF",
          200: "#ECE8DF",
          300: "#DFD9CC",
        },
        surface: "#FCFBF8",
        ink: {
          DEFAULT: "#0E0E0E",
          muted: "#5E5B55",
          subtle: "#8A867E",
        },
        orbit: {
          blue: "#4F5BD5",
          glow: "#6366F1",
        },
      },
      boxShadow: {
        clay: "0 18px 38px -14px rgba(17, 17, 17, 0.14), 0 4px 12px -4px rgba(17, 17, 17, 0.06)",
        "clay-hover":
          "0 22px 44px -12px rgba(17, 17, 17, 0.18), 0 0 0 2px rgba(79, 91, 213, 0.85)",
        panel:
          "0 24px 60px -16px rgba(17, 17, 17, 0.12), 0 2px 10px -2px rgba(17, 17, 17, 0.04)",
      },
    },
  },
  plugins: [typography],
};

export default config;
