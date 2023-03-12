# Specify the Node.js base image and its version
FROM node:16.15.0

# Set the working directory to /app
WORKDIR /backend

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemom globally
RUN npm install -g nodemon

# Install typescrio globally
RUN npm install -g typescript

COPY . .

# Set the entry point command to run npm run dev
CMD ["npm", "run", "dev"]