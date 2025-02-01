import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import path from "path";
import fs from "fs";
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


// Set up storage
const upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const uploadDir = path.join(process.cwd(), "public/uploads");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
      },
    }),
  });
  
  // Middleware function
  const uploadMiddleware = upload.single("file");

// Wrapper function to handle file uploads
export async function POST(request: NextRequest) {
  try {
    await connectDB(); // Connect to MongoDB

    return new Promise((resolve, reject) => {
      upload.single("file")(request as any, {} as any, async (err) => {
        if (err) {
          console.error("File upload error:", err);
          return reject(NextResponse.json({ error: "File upload failed" }, { status: 500 })); 
        }

        const body = await request.formData();
        const printItemObj: any = {};
        console.log(body,'###########')

        body.forEach((value, key) => {
          printItemObj[key] = value;
        });

        printItemObj.status = "PENDING"; // Default status
        printItemObj.createdAt = new Date(); // Timestamp
        console.log(body.get('file'))
        printItemObj.file = `/uploads/${(request as any).file.filename}`; // Store file path

        const newPrintItem = new PrintItems(printItemObj);
        const result = await newPrintItem.save();

        resolve(NextResponse.json(result));
      });
    });
  } catch (error) {
    console.error("Error creating print item:", error);
    return NextResponse.json({ error: "Failed to create print item" }, { status: 500 });
  }
}

