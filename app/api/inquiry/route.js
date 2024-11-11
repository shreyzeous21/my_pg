import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// POST API to handle inquiry creation
export async function POST(req) {
  try {
    const { name, email, phoneNumber, roomType } = await req.json();

    // Validate input data
    if (!name || !email || !phoneNumber || !roomType) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Create a new inquiry in the database
    const newInquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phoneNumber,
        roomType,
      },
    });

    // Return the created inquiry as the response
    return NextResponse.json(
      { message: "Inquiry created successfully", inquiry: newInquiry },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json(
      { message: "Failed to create inquiry", error: error.message },
      { status: 500 }
    );
  }
}

// GET API to fetch all inquiries
export async function GET() {
  try {
    // Fetch all inquiries from the database
    const inquiries = await prisma.inquiry.findMany();

    // Return the inquiries as the response
    return NextResponse.json(
      { message: "Inquiries fetched successfully", inquiries },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json(
      { message: "Failed to fetch inquiries", error: error.message },
      { status: 500 }
    );
  }
}
