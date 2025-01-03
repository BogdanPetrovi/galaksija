/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: '#2D3B48',
        green: '#046A1D',
        blue: '#3E80FC',
        pink: '#CB1BAB'     
      },
    },
  },
  safelist: [
    'text-green',
    'text-blue',
    'text-pink'
  ],
  plugins: [],
}

