/* eslint-disable @next/next/no-img-element */
// components/RoomList.js

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader } from "lucide-react";

const RoomList = () => {
  const [rooms, setRooms] = useState([]); // Room data state
  const [filteredRooms, setFilteredRooms] = useState([]); // Filtered room data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [categoryFilter, setCategoryFilter] = useState(""); // Category filter state
  const router = useRouter();

  // Fetch rooms data
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/rooms"); // Your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }
        const data = await response.json();
        setRooms(data);
        setFilteredRooms(data); // Initially show all rooms
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Handle category filter
  useEffect(() => {
    if (categoryFilter) {
      const filtered = rooms.filter((room) => room.category === categoryFilter);
      setFilteredRooms(filtered);
    } else {
      setFilteredRooms(rooms); // Show all rooms if no category is selected
    }
  }, [categoryFilter, rooms]);

  if (loading) {
    return (
      <div className="flex justify-center text-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <Loader className="animate-spin text-red-500 text-6xl mb-4" />
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Show only the first three rooms and a View All button
  const roomsToShow = filteredRooms.slice(0, 3);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Our Rooms</h2>

        {/* Category Filter */}
        <div className="mb-8">
          <button
            onClick={() => setCategoryFilter("Single")}
            className={`px-4 py-2 mx-2 text-white rounded-md ${
              categoryFilter === "Single" ? "bg-red-500" : "bg-gray-300"
            } hover:bg-red-400 transition-colors`}
          >
            Single Room
          </button>
          <button
            onClick={() => setCategoryFilter("Double")}
            className={`px-4 py-2 mx-2 text-white rounded-md ${
              categoryFilter === "Double" ? "bg-red-500" : "bg-gray-300"
            } hover:bg-red-400 transition-colors`}
          >
            Double Room
          </button>
          <button
            onClick={() => setCategoryFilter("")} // Clear filter
            className={`px-4 py-2 mx-2 text-white rounded-md ${
              categoryFilter === "" ? "bg-red-500" : "bg-gray-300"
            } hover:bg-red-400 transition-colors`}
          >
            All Rooms
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {roomsToShow.map((room) => (
            <div key={room.id} className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src={room.imageUrl || "https://via.placeholder.com/150"} // fallback image
                alt={room.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
              <p className="text-gray-600 mb-4">{room.description}</p>
              {/* Display the category on the card */}
              <p className="text-sm text-gray-500 mb-4">{room.category}</p>
              <p className="text-lg font-bold text-red-500">
                {/* ${room.price}/month */}
                <Link href="/contactus">Contact Us</Link>
              </p>
              <a
                href={`/rooms/${room.id}`}
                className="text-red-500 hover:underline mt-4 inline-block"
              >
                View Details
              </a>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {filteredRooms.length > 3 && (
          <button
            onClick={() => router.push("/rooms")}
            className="bg-red-500 text-white py-3 px-6 rounded-md text-lg hover:bg-red-600 mt-8"
          >
            View All Rooms
          </button>
        )}
      </div>
    </section>
  );
};

export default RoomList;
