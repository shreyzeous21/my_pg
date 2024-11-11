import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// GET request handler: Fetch all reviews
export async function GET(req) {
  try {
    // Fetch all reviews from the database using Prisma
    const reviews = await prisma.review.findMany();

    // Return the reviews as JSON
    return NextResponse.json(reviews, { status: 200 });
  } catch (err) {
    console.error("Error fetching reviews:", err);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// POST request handler: Create a new review
export async function POST(req) {
  try {
    const { name, reviewText } = await req.json();

    // Validate incoming data
    if (!name || !reviewText) {
      return NextResponse.json(
        { error: "Name and reviewText are required" },
        { status: 400 }
      );
    }

    // Create a new review in the database
    const newReview = await prisma.review.create({
      data: {
        name,
        reviewText,
      },
    });

    // Return the newly created review
    return NextResponse.json(newReview, { status: 201 });
  } catch (err) {
    console.error("Error creating review:", err);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}

// DELETE request handler: Delete a review by ID (Path parameter)
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    // Validate that ID is provided
    if (!id) {
      return NextResponse.json(
        { error: "Review ID is required" },
        { status: 400 }
      );
    }

    // Delete the review from the database
    const deletedReview = await prisma.review.delete({
      where: {
        id,
      },
    });

    // Return a 204 response (no content)
    return NextResponse.json(deletedReview, { status: 204 });
  } catch (err) {
    console.error("Error deleting review:", err);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}
