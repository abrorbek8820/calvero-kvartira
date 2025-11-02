/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ⚡ Juda muhim! 'media' emas!
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        calveroRed: "#D7263D",
        calveroGray: "#F5F5F5",
        calveroDark: "#6669efff",
      },
    },
  },
  plugins: [],
};
