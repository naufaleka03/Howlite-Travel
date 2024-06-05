/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,js,ejs}", // Updated to include all HTML, JS, and EJS files
      "./public/**/*.html"
    ],
    theme: {
      extend: {
        colors: {
          customGray: {
            lightest: '#ededed',
            lighter: '#cac8c7',
            light: '#a7a2a1',
            DEFAULT: '#847c7b',
            dark: '#615755',
          },
          customBlue: {
            veryLight: '#F6F1F1',
            mediumLight: '#AFD3E2',
            base: '#19A7CE',
            deep: '#146C94',
          },
        },
        fontFamily: {
          poppins: ['Poppins', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }