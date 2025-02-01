import { NextRequest, NextResponse } from "next/server";
import path from "path";
import  { writeFile } from "fs/promises";
import { connectDB } from "@/lib/mongodb";
import PrintItems from "@/models/PrintItems";

export async function GET() {
  try {
    await connectDB(); // Connect to MongoDB
    console.log("Fetching Print Items...");
    
    const items = await PrintItems.find({});
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching print items:", error);
    return NextResponse.json({ error: "Failed to fetch print items" }, { status: 500 });
  }
}



// Wrapper function to handle file uploads

export async function POST(request: NextRequest) {
  try {
    await connectDB(); // Connect to MongoDB

    // ✅ Extract form data
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "No file received" }, { status: 400 });
    }

    // ✅ Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ✅ Ensure unique filename to prevent overwriting
    const fileName = `${Date.now()}-${file.name}`;
    const uploadPath = path.join(process.cwd(), "public", "uploads", fileName);

    // ✅ Save file to /public/uploads/
    await writeFile(uploadPath, buffer);

    // ✅ Extract form fields
    const printItemObj: any = {};
    data.forEach((value, key) => {
      printItemObj[key] = value;
    });

    printItemObj.status = "PENDING"; // Default status
    printItemObj.createdAt = new Date(); // Timestamp
    printItemObj.file = `/uploads/${fileName}`; // ✅ Correctly store file path

    console.log("Saved print item:", printItemObj);

    // ✅ Save to MongoDB
    const newPrintItem = new PrintItems(printItemObj);
    const result = await newPrintItem.save();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating print item:", error);
    return NextResponse.json({ error: "Failed to create print item" }, { status: 500 });
  }
}


