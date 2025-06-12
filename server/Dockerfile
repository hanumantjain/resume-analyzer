# Dockerfile for Node Express
FROM node:18-alpine

# Create and set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app source code
COPY . .

# Expose the backend port (adjust if your app uses a different one)
EXPOSE 5001

# Start the app
CMD ["npm", "start"]
