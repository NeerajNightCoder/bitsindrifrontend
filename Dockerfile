# Step 1: Use a Node.js 18 base image
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Step 2: Install dependencies
COPY package*.json ./
RUN npm install

# Step 3: Build the Next.js app
COPY . .
RUN npm run build

# Step 4: Create the final lightweight image for runtime
FROM node:18-alpine AS runtime
WORKDIR /app

# Copy the build output from the build stage
COPY --from=build /app/.next ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/public ./public

# Expose the port that the app will run on
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
