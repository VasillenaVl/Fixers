/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'primary' : "#899E8B"
      },
      gridTemplateColumns: {     // Това е свойство на CSS Grid Layout, което определя как колоните в мрежата ще бъдат разпределени (ширина и брой)
        'auto': 'repeat(auto-fill, minmax(180px, 1fr))'
      }
    },
  },
  plugins: [],
}