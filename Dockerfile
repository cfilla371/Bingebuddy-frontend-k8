# Use an official Node.js runtime as a parent image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Explicitly install the missing rollup optional dependency
RUN npm install --optional @rollup/rollup-linux-x64-musl

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your application will run on (if applicable, e.g., for preview)
EXPOSE 5173

# Define the command to run your application in development
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
# CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]