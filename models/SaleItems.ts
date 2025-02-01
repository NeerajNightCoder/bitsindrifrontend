import mongoose from "mongoose";

const SaleItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  file: String, // File path (if uploaded)
  createdAt: { type: Date, default: Date.now },
});

const SaleItem = mongoose.models.SaleItem || mongoose.model("SaleItem", SaleItemSchema);
export default SaleItem;

export interface ISaleItem {
  _id: string; // MongoDB ObjectId represented as a string
  id: string; // Unique identifier for the sale item
  file: string; // Path to the uploaded file (could be relative path from the public directory)
  ownerId: string; // The ID of the owner (user) who created the sale item
  name: string; // Name of the person creating the sale item
  contact: string; // Contact information of the person
  instruction: string; // Any additional instructions related to the sale item
  status: "PENDING" | "COMPLETED" | "CANCELLED"; // The status of the sale item
  createdAt: Date; // Timestamp of when the sale item was created
  updatedAt: Date; // Timestamp of when the sale item was last updated
  __v: number; // Version key for MongoDB document, automatically handled by Mongoose
}
