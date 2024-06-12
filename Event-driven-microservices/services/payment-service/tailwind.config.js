/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: [
      "./src/**/*.{html,js,ejs}", // Updated to include all HTML, JS, and EJS files
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
        },
        fontFamily: {
          poppins: ['Poppins', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }