/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
    './views/*.pug'
  ],
  theme: {
    extend: {
      animation: {
        'fade-up': 'fade-up .3s ease',
        'progress': 'progress 3s linear'
      },
      keyframes: {
        'fade-up': {
          '0%': { transform: 'translateY(64px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'progress': {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        }
      },
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
