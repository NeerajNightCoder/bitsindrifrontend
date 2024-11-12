import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { supabase } from "@/lib/supabase";
import { randomUUID } from "crypto";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  console.log(formData);

  const file = formData.get("file") as File | null;
  const name = formData.get("name");
  const description = formData.get("description");
  const price = formData.get("price");
  const contact = formData.get("contact");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filenameArray = file.name.replaceAll(" ", "_").split(".");
  const filename = filenameArray[0] + randomUUID() + "." + filenameArray[1];
  console.log(filename);
  try {
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    );
    // Insert file info into Supabase saleItems table
    const { error } = await supabase
      .from("saleitems")
      .insert([{ img: filename, price, name, contact, description }]);

    if (error) {
      throw new Error(error.message);
    }
    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
