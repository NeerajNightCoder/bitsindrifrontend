# Step 1: Use an official Node.js runtime as a parent image
FROM node:18-slim

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install --frozen-lockfile

# Step 5: Copy the rest of the project files
COPY . .

# Step 6: Build the Next.js app
RUN npm run build

# Step 7: Expose the port that the Next.js app will run on
EXPOSE 3000

# Step 8: Start the Next.js app
CMD ["npm", "start"]
