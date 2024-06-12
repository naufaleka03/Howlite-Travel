/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{html,js,ejs}", // Updated to include all HTML, JS, and EJS files
  ],
  theme: {
    extend: {
      colors: {
        customBlue: {
          veryLight: '#F6F1F1',
          mediumLight: '#AFD3E2',
          base: '#19A7CE',
          deep: '#146C94',
          darker: '#0A2E4E',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}