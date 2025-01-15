# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Copy .env file
COPY .env .env

# Build the Next.js application
RUN npm run build

# Expose port 3000
EXPOSE 3005

# Command to run the application
CMD ["npm", "start"]