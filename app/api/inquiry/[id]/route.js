// app/api/inquiry/[id]/route.js
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// DELETE API to handle inquiry deletion by id
export async function DELETE(req, { params }) {
  const { id } = params; // Get the dynamic `id` from the URL

  try {
    // Find and delete the inquiry by id
    const deletedInquiry = await prisma.inquiry.delete({
      where: {
        id: String(id), // Ensure the id is converted to a number if necessary
      },
    });

    if (!deletedInquiry) {
      return NextResponse.json(
        { message: "Inquiry not found" },
        { status: 404 }
      );
    }

    // Return a success response
    return NextResponse.json(
      { message: "Inquiry deleted successfully", inquiry: deletedInquiry },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json(
      { message: "Failed to delete inquiry", error: error.message },
      { status: 500 }
    );
  }
}
