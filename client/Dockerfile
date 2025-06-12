# Dockerfile for React client

# Build react client
FROM node:18-alpine

# Working directory be app
WORKDIR /app

COPY package*.json ./

### Installing dependencies

RUN npm install --silent

# Copy local files to app folder
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
