Node modules:
-express
-tailwindcss == npm install -D tailwindcss
-concurrently == npm install -D concurrently
-browser-sync == npm install -D browser-sync
-ejs == npm install ejs
-jsonwebtoken (login) == npm install jsonwebtoken
-pg == npm install pg
-amqplib == npm install amqplib



"scripts": {
    "build": "tailwindcss -i ./src/styles/tailwind.css -o ./public/css/output.css",
    "start": "node --watch src/app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

browser-sync start --proxy "http://localhost:3000" --files "services/booking-service/public/css/*.css, services/booking-service/src/**/*.js, services/booking-service/src/views/**/*.ejs" --no-notify

docker pull rabbitmq
   docker run -d --name my-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management