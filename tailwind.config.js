/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgColor: "var(--fallback-b1, oklch(var(--b1) / 1));",
      },
    },
    fontSize: {},
  },
  plugins: [],
};
