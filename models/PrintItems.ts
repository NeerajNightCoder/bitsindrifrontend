import mongoose from "mongoose";

const PrintItemsSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Auto-generated MongoDB ObjectId
    id: { type: String, required: true, unique: true }, // Unique ID for the file
    file: { type: String, required: true }, // File path or URL
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
    name: { type: String, required: true }, // Name associated with the file
    contact: { type: String, required: true, match: /^[0-9]+$/ }, // Ensure it's a number string
    instruction: { type: String, default: "" }, // Optional instructions
    status: { 
      type: String, 
      required: true, 
      enum: ["PENDING", "PROCESSING", "COMPLETED"], 
      default: "PENDING" 
    }, // Default to "PENDING"
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

export default mongoose.models.PrintItems || mongoose.model("PrintItems", PrintItemsSchema);
