import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Fetch all reviews from the database
    const reviews = await prisma.review.findMany();
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ message: "Error fetching reviews" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    // Get data from the request body
    const { name, reviewText } = await req.json();

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
    return NextResponse.json({ message: "Error creating review" }, { status: 500 });
  }
}
