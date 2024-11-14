/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageFile: null, // Holds the uploaded image file
  });
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch all rooms on component mount
    fetch("/api/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((error) => console.error("Failed to fetch rooms:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setFormData((prevData) => ({
        ...prevData,
        imageFile: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Step 1: Upload the image
    if (formData.imageFile) {
      const imageFormData = new FormData();
      imageFormData.append("file", formData.imageFile);
      imageFormData.append("userId", "user123"); // Replace with the actual user ID

      const uploadResponse = await fetch("/api/uploads", {
        method: "POST",
        body: imageFormData,
      });
      const uploadResult = await uploadResponse.json();

      if (uploadResult.success) {
        setImageUrl(uploadResult.imageUrl);
      } else {
        setMessage("Failed to upload image");
        return;
      }
    }

    // Step 2: Create the room with the uploaded image URL
    try {
      const response = await fetch("/api/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: formData.price,
          imageUrl: imageUrl, // Use the URL from the upload response
          category: formData.category,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setRooms((prevRooms) => [result, ...prevRooms]);
        setMessage("Room created successfully!");
      } else {
        setMessage(result.message || "Failed to create room.");
      }
    } catch (error) {
      console.error("Error creating room:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/rooms/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
        setMessage("Room deleted successfully!");
      } else {
        const result = await response.json();
        setMessage(result.message || "Failed to delete room.");
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5">Create a Room</h2>
      <form onSubmit={handleFormSubmit} className="flex flex-col">
        <input
          type="text"
          name="name"
          placeholder="Room Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="p-2 mb-3 border rounded"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          required
          className="p-2 mb-3 border rounded"
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          required
          className="p-2 mb-3 border rounded"
        />
        <input
          type="file"
          name="imageFile"
          accept="image/*"
          onChange={handleInputChange}
          required
          className="p-2 mb-3 border rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleInputChange}
          required
          className="p-2 mb-3 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Create Room
        </button>
      </form>
      {message && <p className="mt-3 text-red-500">{message}</p>}

      <h2 className="text-2xl font-semibold py-8">Explore Our Rooms</h2>
      <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-8">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-400 hover:scale-102 flex flex-col items-center"
          >
            {room.imageUrl && (
              <img
                src={room.imageUrl}
                alt={room.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <h3 className="text-xl font-medium text-gray-800 mb-3">
              {room.name}
            </h3>
            <p className="text-gray-600 mb-3">{room.description}</p>
            <p className="text-sm text-gray-500 mb-4">
              Category: {room.category}
            </p>
            <p className="text-lg font-semibold text-red-500">
              Price: ${room.price}
            </p>
            <button
              onClick={() => handleDelete(room.id)}
              className="mt-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-250"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsPage;
