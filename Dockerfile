# Step 1: Use an official Node.js runtime as the base image
FROM node:18-alpine

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Declare build-time arguments
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_KEY
ARG MONGODB_URI

# Step 6: Set the environment variables for runtime
ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV NEXT_PUBLIC_SUPABASE_KEY=${NEXT_PUBLIC_SUPABASE_KEY}
ENV MONGODB_URI=${MONGODB_URI}

# Step 7: Copy the rest of your app's code into the container
COPY . .

# Step 8: Build the Next.js app
RUN npm run build

# Step 9: Expose the port that the Next.js app will run on
EXPOSE 3000

# Step 10: Start the Next.js app
CMD ["npm", "start"]
