/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        secondary: '#000000',
        accent: '#E6087B',
        text: '#333333',
        border: '#666666',
        highlight: '#999999',
      },
      animation: {
        'draw-scroll': 'draw-scroll 15s ease-in-out',
      },
      keyframes: {
        'draw-scroll': {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
    },
  },
  plugins: [],
}
