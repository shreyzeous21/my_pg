import prisma from "@/utils/connect"; // Assuming you have a connect file to instantiate Prisma Client
import { NextResponse } from "next/server";

// GET ALL ROOMS
export const GET = async () => {
  try {
    const rooms = await prisma.room.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(rooms, { status: 200 });
  } catch (err) {
    console.error(
      "Error fetching rooms:",
      err instanceof Error ? err.message : err
    ); // Improved error logging
    return NextResponse.json(
      { message: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
};

// CREATE A NEW ROOM
export const POST = async (req) => {
  try {
    const body = await req.json();
    const { name, description, price, imageUrl, category } = body;

    // Validate request body
    if (!name || !description || !price || !imageUrl || !category) {
      return NextResponse.json(
        {
          message:
            "Name, description, price, image URL, and category are required",
        },
        { status: 400 }
      );
    }

    // Ensure price is a valid number
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      return NextResponse.json(
        { message: "Price must be a valid number" },
        { status: 400 }
      );
    }

    // Create new room with category
    const newRoom = await prisma.room.create({
      data: {
        name,
        description,
        price: parsedPrice, // Use the parsed number
        imageUrl,
        category,
      },
    });

    return NextResponse.json(newRoom, { status: 201 });
  } catch (err) {
    // Proper error logging
    console.error(
      "Error creating room:",
      err instanceof Error ? err.message : err
    ); // Improved error logging
    return NextResponse.json(
      { message: "Failed to create room" },
      { status: 500 }
    );
  }
};
