Node modules:
-express
-tailwindcss
-browser-sync
-ejs
-jsonwebtoken (login)
-pg

"scripts": {
    "build": "tailwindcss -i ./src/styles/tailwind.css -o ./public/css/output.css",
    "start": "node --watch src/app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

browser-sync start --proxy "http://localhost:3000" --files "services/login-service/public/css/*.css, services/login-service/src/views/*.ejs" --no-notify
