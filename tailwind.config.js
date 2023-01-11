/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
    './views/*.pug'
  ],
  theme: {
    extend: {
      colors: {
        'main': '#00B7FF',
        'custom-red': 'rgb(223, 80, 80)',
        'dark-gray': '#141414'
      },
      boxShadow: {
        'innerGlow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.4)',
      }
    }
  },
  plugins: [],
}
