import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#1d6fd6", dark: "#0f3d78" },
        navy: { DEFAULT: "#1e2049", deep: "#0d2247" },
        mist: "#eef4fc",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        head: ["var(--font-jakarta)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
