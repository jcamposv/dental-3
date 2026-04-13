/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        salmon: {
          DEFAULT: "#F2B8A0",
          light: "#FBE5DA",
          lighter: "#FDF3EE",
          dark: "#E8976F",
        },
        rose: {
          DEFAULT: "#F4C6B8",
          light: "#FAE0D7",
        },
        cream: {
          DEFAULT: "#FFF8F5",
          dark: "#FFF0EA",
        },
        charcoal: "#1A1A1A",
        muted: "#6B6B6B",
        soft: "#9A9A9A",
      },
      fontFamily: {
        serif: ['"DM Serif Display"', "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
