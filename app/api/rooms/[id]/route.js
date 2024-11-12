import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/connect'; // Ensure this points to your Prisma client setup

export async function DELETE(req, { params }) {
  const { id } = params;

  // Validate that ID is provided
  if (!id) {
    return NextResponse.json({ message: 'Room ID is required' }, { status: 400 });
  }

  try {
    // Delete the room from the database using Prisma
    const deletedRoom = await prisma.room.delete({
      where: {
        id: id, // Assuming 'id' is the unique identifier for the room
      },
    });

    // Return a response confirming the deletion
    return NextResponse.json({ message: `Room with ID ${id} deleted`, deletedRoom }, { status: 200 });
  } catch (error) {
    console.error("Error deleting room:", error);
    return NextResponse.json({ message: 'Failed to delete room', error: error.message }, { status: 500 });
  }
}
