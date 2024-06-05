Node modules:
-express
-tailwindcss
-browser-sync
-ejs
-jsonwebtoken (login)
-pg
-amqplib

"scripts": {
    "build": "tailwindcss -i ./src/styles/tailwind.css -o ./public/css/output.css",
    "start": "node --watch src/app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

browser-sync start --proxy "http://localhost:3000" --files "services/login-register/public/css/*.css,services/login-register/src/views/*.ejs" --no-notify

docker pull rabbitmq
   docker run -d --name my-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management