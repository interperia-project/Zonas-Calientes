# Specify the Node.js base image and its version
FROM node:16.15.0

# Copy the the application code to the container
COPY . .

# Set the working directory to /app
WORKDIR /backend

# Install dependencies
RUN npm install

# Install nodemom globally
RUN npm install -g nodemon

# Install typescript and ts-node as development dependencies
RUN npm install typescript

# Set the entry point command to run npm run dev
CMD ["npm", "run", "dev"]

