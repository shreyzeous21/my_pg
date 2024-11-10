import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// GET ALL REVIEWS
export const GET = async () => {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
    });
    return new NextResponse(JSON.stringify(reviews), { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to fetch reviews" }),
      { status: 500 }
    );
  }
};

// CREATE A NEW REVIEW
export const POST = async (req) => {
  try {
    const body = await req.json();

    // Validate required fields
    if (!body.name || !body.reviewText) {
      return new NextResponse(
        JSON.stringify({ message: "Name and review text are required" }),
        { status: 400 }
      );
    }

    // Create a new review in the database
    const newReview = await prisma.review.create({
      data: { name: body.name, reviewText: body.reviewText },
    });

    return new NextResponse(JSON.stringify(newReview), { status: 201 });
  } catch (err) {
    console.error("Error creating review:", err);
    return new NextResponse(
      JSON.stringify({ message: "Failed to create review" }),
      { status: 500 }
    );
  }
};
