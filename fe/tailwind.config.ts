// Tailwind v4 — theme configuration is now handled via @theme in globals.css.
// This file is kept for any future JS-only overrides (e.g. plugins, safelist).
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
};

export default config;
