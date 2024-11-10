import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    // Fetch all reviews from the database
    const reviews = await prisma.review.findMany();
    return new Response(JSON.stringify(reviews), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return new Response('Error fetching reviews', { status: 500 });
  }
}

export async function POST(req) {
  try {
    // Get data from the request body
    const { name, reviewText } = await req.json();

    if (!name || !reviewText) {
      return new Response('Name and review text are required', { status: 400 });
    }

    // Create a new review in the database
    const review = await prisma.review.create({
      data: {
        name,
        reviewText,
      },
    });

    return new Response(JSON.stringify(review), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating review:', error);
    return new Response('Error creating review', { status: 500 });
  }
}
