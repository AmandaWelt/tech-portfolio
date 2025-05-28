/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f0f0f",
        surface: "#1a1a1a",
        card: "#10101a",
        accent: "#d8d4ff",
        primary: "#a78bfa",
      },
      fontWeight: {
        extrabold: "800",
      },
      fontFamily: {
        header: ['Ubuntu', 'sans-serif'],
        body: ['Pontano Sans', 'sans-serif'],
      }
    },    
  },
  plugins: [],
}
