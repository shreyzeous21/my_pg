/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";

const RoomPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false); // Tracks delete loading state

  // Fetch all rooms on component mount
  const fetchRooms = async () => {
    try {
      const response = await fetch("/api/rooms");
      if (!response.ok) {
        throw new Error("Failed to fetch rooms");
      }
      const data = await response.json();
      setRooms(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Delete room function with optimistic UI update
  const deleteRoom = async (id) => {
    const originalRooms = [...rooms];
    setDeleting(true); // Indicate delete in progress

    // Optimistically update the UI
    setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));

    try {
      const response = await fetch(`/api/rooms/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete room");
      }

      setError(null); // Clear any existing errors
    } catch (err) {
      console.error("Error deleting room:", err);
      setRooms(originalRooms); // Roll back to the original state if deletion fails
      setError(err.message || "Failed to delete room");
    } finally {
      setDeleting(false); // End delete loading state
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading rooms...</div>;
  }

  return (
    <div className="p-6 font-sans bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-green-600 mb-4">Rooms</h2>

      {/* Display error message */}
      {error && (
        <div className="text-red-500 mb-4">
          <strong>{error}</strong>
        </div>
      )}

      {/* Show loading message during deletion */}
      {deleting && (
        <p className="text-gray-500">Deleting room... Please wait.</p>
      )}

      {/* Display rooms or message if none exist */}
      {rooms.length === 0 ? (
        <p className="text-gray-500">No rooms found.</p>
      ) : (
        <div className="max-h-96 overflow-y-auto scrollbar-hidden">
          <ul className="space-y-4">
            {rooms.map((room) => (
              <li
                key={room.id}
                className="p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-300"
              >
                <div className="flex flex-col space-y-2">
                  <p className="text-lg font-bold text-gray-800">{room.name}</p>
                  <p className="text-sm text-gray-600">{room.description}</p>
                  <p className="text-sm text-gray-600">
                    <strong>Price:</strong> ${room.price}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Category:</strong> {room.category}
                  </p>
                  {room.imageUrl && (
                    <img
                      src={room.imageUrl}
                      alt={room.name}
                      className="w-[50vw] h-[10vh] rounded-md mt-2"
                    />
                  )}
                </div>

                <button
                  onClick={() => deleteRoom(room.id)}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                  disabled={deleting} // Disable button while deleting
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RoomPage;