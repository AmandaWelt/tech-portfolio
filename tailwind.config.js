/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#000000",
        canvas: "#000000",
        void: "#07080c",
        voidline: "rgba(255, 255, 255, 0.1)",
        elevated: "#0a0a0a",
        surface: "#111111",
        panel: "#161616",
        ink: "#e6f1ff",
        muted: "#8892b0",
        subtle: "#5c6b82",
        hairline: "rgba(255, 255, 255, 0.06)",
        accent: "#64ffda",
        accentDim: "rgba(100, 255, 218, 0.12)",
        accentPurple: "#c792ea",
      },
      spacing: {
        gutter: "clamp(1.25rem, 5vw, 2.5rem)",
        section: "clamp(5rem, 10vw, 7rem)",
        sidenav: "5rem",
      },
      maxWidth: {
        page: "720px",
        wide: "1280px",
      },
      fontFamily: {
        sans: [
          "DM Sans",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "system-ui",
          "sans-serif",
        ],
        display: ['"Space Grotesk"', "DM Sans", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "Consolas", "Monaco", "monospace"],
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(100,255,218,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(100,255,218,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
    },
  },
  plugins: [],
};

