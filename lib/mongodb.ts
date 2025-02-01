import { MongoClient } from "mongodb";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

const uri = process.env.MONGODB_URI || ""; // Replace with your MongoDB connection string
const options = {};

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable to preserve the value across hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, don't use a global variable
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
