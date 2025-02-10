import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import SaleItem, { ISaleItem } from "@/models/SaleItems"; // Import the SaleItem Mongoose model and interface

// Define an interface for Sale Item
type SaleItemRequest = Omit<ISaleItem, "_id">;


export async function GET() {
  try {
    await connectDB();

    const saleItems = await SaleItem.find({}); // Fetch from Mongoose model
    return NextResponse.json(saleItems);
  } catch (error) {
    console.error("Error fetching sale items:", error);
    return NextResponse.json({ error: "Failed to fetch sale items" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    let filePath

     // ✅ Extract form data
     const data = await request.formData();
     const file: File | null = data.get("image") as unknown as File;
     if (!file) {
       return NextResponse.json({ error: "No file received" }, { status: 400 });
     }
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${file.name}`;
      const uploadPath = path.join(process.cwd(), "public", "uploads", fileName);

      await writeFile(uploadPath, buffer);
      filePath = `/uploads/${fileName}`;
    }

    // Convert form data into an object
    const saleItemObj: any = {} as SaleItemRequest;
    data.forEach((value, key) => {
      saleItemObj[key] = value;
    });

    saleItemObj.createdAt = new Date();
    if (filePath) saleItemObj.filePath = filePath; // Store file path if uploaded

    // Use Mongoose to save data
    const newSaleItem = new SaleItem(saleItemObj);
    const result = await newSaleItem.save();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating sale item:", error);
    return NextResponse.json({ error: "Failed to create sale item" }, { status: 500 });
  }
}
