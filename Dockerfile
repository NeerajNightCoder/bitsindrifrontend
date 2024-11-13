# Step 1: Use node:alpine as the base image for building the app
FROM node:18-alpine AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the project files into the container
COPY . .

# Step 6: Build the Next.js app
RUN npm run build

# Step 7: Set up the runtime container using node:alpine as base
FROM node:18-alpine AS runtime

WORKDIR /app

# Copy the build artifacts from the build stage
COPY --from=build /app ./

# Install only production dependencies (if needed)
RUN npm install --production

# Expose the port the app runs on
EXPOSE 3000

# Command to run the Next.js app
CMD ["npm", "start"]
