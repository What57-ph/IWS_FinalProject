/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgColor: "var(--fallback-b1, oklch(var(--b1) / 1));",
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
      borderWidth: {
        1: "1px",
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(110%)' },
          '100%': { transform: 'translateX(-250%)' },
        },
      },
      animation: {
        slide: 'slide 30s linear infinite',
      },
    },
  },
  plugins: [],
};
