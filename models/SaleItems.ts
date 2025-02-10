import mongoose from "mongoose";

const SaleItemSchema = new mongoose.Schema({
  title: String,
  description: String, // Any additional descriptions related to the sale item
  price: Number,
  category: String,
  filePath: String, // File path (if uploaded),
  status: { 
    type: String, 
    required: true, 
    enum: ["PENDING", "NOT_APPROVED", "APPROVED"], 
    default: "PENDING" 
  }, // Default to "PENDING"
  createdAt: { type: Date, default: Date.now },
});

const SaleItem = mongoose.models.SaleItem || mongoose.model("SaleItem", SaleItemSchema);
export default SaleItem;

export interface ISaleItem {
  _id: string; // MongoDB ObjectId represented as a string
  id: string; // Unique identifier for the sale item
  filePath: string; // Path to the uploaded file (could be relative path from the public directory)
  ownerId: string; // The ID of the owner (user) who created the sale item
  name: string; // Name of the person creating the sale item
  contact: string; // Contact information of the person
  description: string; // Any additional descriptions related to the sale item
  status: { 
    type: String, 
    required: true, 
    enum: ["PENDING", "NOT_APPROVED", "APPROVED"], 
    default: "PENDING" 
  }, // Default to "PENDING"
  createdAt: Date; // Timestamp of when the sale item was created
  updatedAt: Date; // Timestamp of when the sale item was last updated
  __v: number; // Version key for MongoDB document, automatically handled by Mongoose
}
