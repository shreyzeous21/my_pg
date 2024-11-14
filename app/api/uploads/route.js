import { writeFile, mkdir } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");
  const userId = data.get("userId"); // Assuming `userId` is passed in formData

  if (!file) {
    return NextResponse.json({ message: "File not found", success: false });
  }

  const byteData = await file.arrayBuffer();
  const buffer = Buffer.from(byteData);

  const userDirectory = path.join(process.cwd(), `./public/uploads/${userId}`);

  try {
    await mkdir(userDirectory, { recursive: true });
    const filePath = path.join(userDirectory, file.name);
    await writeFile(filePath, buffer);

    // Generate a URL for accessing the image
    const imageUrl = `/uploads/${userId}/${file.name}`;

    return NextResponse.json({ imageUrl, success: true });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json({ message: "File upload failed", success: false });
  }
}
