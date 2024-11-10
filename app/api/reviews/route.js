import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// GET ALL REVIEWS
export const GET = async (req) => {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
    });
    return new NextResponse(JSON.stringify(reviews, { status: 200 }));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      JSON.stringify({ message: "Failed to fetch comments" }),
      { status: 500 }
    );
  }
};

// CREATE A NEW REVIEW
export const POST = async (req) => {
  try {
    // Get data from the request body
    const { name, reviewText } = await req.json();

    // Validate required fields
    if (!name || !reviewText) {
      return NextResponse.json(
        { message: "Name and review text are required" },
        { status: 400 }
      );
    }

    // Create a new review in the database
    const review = await prisma.review.create({
      data: {
        name,
        reviewText,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { message: "Error creating review" },
      { status: 500 }
    );
  }
};
