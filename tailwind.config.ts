import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans-stack)"],
        display: ["var(--font-display-stack)"],
        mono: ["var(--font-mono-stack)"],
      },
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-2": "var(--color-surface-2)",
        foreground: "var(--color-fg)",
        "foreground-soft": "var(--color-fg-soft)",
        muted: "var(--color-muted)",
        faint: "var(--color-faint)",
        border: "var(--color-line)",
        "border-strong": "var(--color-line-strong)",
        primary: "var(--color-accent)",
        "primary-hover": "var(--color-accent-hover)",
        "primary-soft": "var(--color-accent-soft)",
        "primary-fg": "var(--color-accent-fg)",
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        soft: "var(--shadow-sm)",
        "soft-md": "var(--shadow-md)",
        "soft-lg": "var(--shadow-lg)",
        glow: "var(--shadow-glow)",
      },
      letterSpacing: {
        tightest: "-0.035em",
      },
    },
  },
  darkMode: ["class", "[data-theme='dark']"],
  plugins: [typography],
} satisfies Config;
