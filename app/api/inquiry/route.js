import prisma from "@/utils/connect"; // Adjust this path to match your setup
import { NextResponse } from "next/server";

// GET ALL INQUIRIES
export const GET = async () => {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(inquiries, { status: 200 });
  } catch (err) {
    console.error("Error fetching inquiries:", err);
    return NextResponse.json(
      { message: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
};

// CREATE A NEW INQUIRY
export const POST = async (req) => {
  try {
    const body = await req.json();
    const { name, email, phoneNumber, roomType } = body;

    // Validate required fields
    if (!name || !email || !phoneNumber || !roomType) {
      return NextResponse.json(
        { message: "Name, email, phone number, and room type are required." },
        { status: 400 }
      );
    }

    // Create new inquiry
    const newInquiry = await prisma.inquiry.create({
      data: { name, email, phoneNumber, roomType },
    });

    return NextResponse.json(newInquiry, { status: 201 });
  } catch (err) {
    console.error("Error creating inquiry:", err);
    return NextResponse.json(
      { message: "Failed to submit inquiry." },
      { status: 500 }
    );
  }
};
