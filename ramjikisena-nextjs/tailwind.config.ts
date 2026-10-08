import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // `xs` = bahut chhote phone (iPhone SE jaise) ke liye extra breakpoint
    screens: {
      xs: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.25rem", lg: "1.5rem" },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        saffron: { DEFAULT: "#ff6b35", dark: "#cc3700" },
        gold: { DEFAULT: "#d4920a", light: "#f9e07a" },
        cream: "#fffaf3",
      },
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "var(--font-deva)",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
