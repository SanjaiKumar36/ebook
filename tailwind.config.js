/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandPurple: "#7c3aed",
        brandLavender: "#c084fc",
        brandGold: "#facc15",
        brandDark: "#0f172a",
        brandBg: "#faf7ff",
      },
    },
  },
  plugins: [],
};