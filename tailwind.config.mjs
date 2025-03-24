/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      serif: ["Lato", "serif"],
    },
    extend: {
      colors: {
        "custom-blue-start": "#01589A",
        "custom-blue-end": "#009CDE",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
