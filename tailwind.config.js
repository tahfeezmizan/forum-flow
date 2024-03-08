/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        clifford: '#da373d',
        primaryColor: 'rgb(18, 19, 45);'
      }
    },
  },
  plugins: [],
}
