# Use an official base image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the rest of your application code
COPY . /usr/src/app

# Expose the port the app runs on
EXPOSE 3002

# Command to run your app
CMD ["node", "src/app.js"]

# docker build -t payment-service-image .