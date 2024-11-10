/* eslint-disable @next/next/no-img-element */
"use client";
import { Loader } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/rooms");
        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }
        const data = await response.json();
        setRooms(data);
        setFilteredRooms(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    if (categoryFilter) {
      const filtered = rooms.filter((room) => room.category === categoryFilter);
      setFilteredRooms(filtered);
    } else {
      setFilteredRooms(rooms);
    }
  }, [categoryFilter, rooms]);

  if (loading) {
    return (
      <div className="  ">
        <div className="text-center">
          <Loader className="animate-spin text-red-500 text-6xl mb-4" />
          <p className="text-gray-400 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-wrap lg:flex-nowrap">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-lg mb-6 lg:mb-0 lg:mr-6">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">
            Filter by Category
          </h3>
          <button
            onClick={() => setCategoryFilter("Single")}
            className={`block w-full text-left text-gray-700 px-6 py-3 mb-4 rounded-lg transition-all duration-300 ${
              categoryFilter === "Single"
                ? "bg-red-100 text-red-500"
                : "hover:bg-gray-300"
            }`}
          >
            Single Room
          </button>
          <button
            onClick={() => setCategoryFilter("Double")}
            className={`block w-full text-left text-gray-700 px-6 py-3 mb-4 rounded-lg transition-all duration-300 ${
              categoryFilter === "Double"
                ? "bg-red-100 text-red-500"
                : "hover:bg-gray-300"
            }`}
          >
            Double Room
          </button>
          <button
            onClick={() => setCategoryFilter("")}
            className={`block w-full text-left text-gray-700 px-6 py-3 rounded-lg transition-all duration-300 ${
              categoryFilter === ""
                ? "bg-red-100 text-red-500"
                : "hover:bg-gray-300"
            }`}
          >
            All Rooms
          </button>
        </div>

        {/* Rooms List */}
        <div className="w-full lg:w-3/4">
          <h2 className="text-3xl font-bold text-center mb-8 text-black underline">
            Our Rooms
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={room.imageUrl || "https://via.placeholder.com/300"}
                  alt={room.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {room.name}
                </h3>
                <p className="text-gray-600 mb-2">{room.description}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Category: {room.category}
                </p>
                <p className="text-lg font-bold text-red-500">
                  {/* ${room.price}/month */}
                  <Link
                    href="/contactus"
                    className="underline hover:text-red-700"
                  >
                    Contact Us
                  </Link>
                </p>
                <Link
                  href={`/rooms/${room.id}`}
                  className="text-red-500 hover:text-red-700 mt-4 inline-block"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;
