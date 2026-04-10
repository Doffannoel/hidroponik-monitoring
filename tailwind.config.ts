import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        surface: "#F1F4F0",
        primary: "#173901",
        primarySoft: "#2D5B0D",
        borderSoft: "rgba(23, 57, 1, 0.21)",
        textSoft: "#5D6F57",
        card: "#F9FBF8"
      },
      boxShadow: {
        soft: "0 20px 50px rgba(23, 57, 1, 0.08)"
      },
      borderRadius: {
        xl2: "1.5rem"
      }
    }
  },
  plugins: []
};

export default config;
