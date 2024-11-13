# Stage 1: Build the Next.js app
FROM node:16-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies (including build tools)
RUN npm install

# Set environment variables using ARG during build
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}

# Copy the rest of the app code into the container
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Create the final lightweight image for runtime
FROM node:16-alpine AS runtime

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/.next .next
COPY --from=build /app/package*.json ./
COPY --from=build /app/public ./public

# Install production dependencies (no dev dependencies)
RUN npm install --only=production

# Expose the port for the Next.js app
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
