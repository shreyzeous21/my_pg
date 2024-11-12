import { NextResponse } from "next/server";
import prisma from "@/utils/connect"; // Assuming your prisma client is exported from this file

export async function DELETE(req, { params }) {
  const { id } = params;

  // Validate that ID is provided
  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  try {
    // Delete the review from the database using Prisma
    const deletedReview = await prisma.review.delete({
      where: {
        id: id, // Assuming 'id' is the unique identifier for the review
      },
    });

    // Return a response confirming the deletion
    return NextResponse.json(
      { message: `Review with ID ${id} deleted`, deletedReview },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { message: "Failed to delete review", error: error.message },
      { status: 500 }
    );
  }
}
