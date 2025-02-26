import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        loading: "loadingBar 2s ease-in-out infinite",
        slideDown: "slideDown 0.5s ease-in-out forwards",
      },
      keyframes: {
        loadingBar: {
          "0%": { width: "0%" },
          "50%": { width: "50%" },
          "100%": { width: "100%" },
        },
        slideDown: {
          "0%": { heigh: "0%", backgroundColor: "black" },
          "100%": { height: "100%", backgroundColor: "red" },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
