import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    console.log('GET')
    const client = await clientPromise;
    const db = client.db("bitsindristore"); // Replace with your database name
    const users = await db.collection("saleitems").find({}).toArray();

    return NextResponse.json(users);
}
export async function POST(request) {
    const client = await clientPromise;
    const db = client.db("bitsindristore");
    
    const body = await request.formData();
    const saleItemObj = {};
body.forEach((value, key) => {
  saleItemObj[key] = value;
});
    console.log(saleItemObj.title
    )
    const result = await db.collection("saleitems").insertOne(saleItemObj);

    return NextResponse.json(result);
}
