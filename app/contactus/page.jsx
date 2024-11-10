"use client";
import React, { useState } from "react";

const HostelInquiryForm = () => {
  const [roomType, setRoomType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      name,
      email,
      phoneNumber, // match your API schema
      roomType, // match your API schema
    };

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setStatusMessage("Inquiry submitted successfully!");
        setName("");
        setEmail("");
        setPhoneNumber("");
        setRoomType("");
      } else {
        setStatusMessage(result.message || "Failed to submit inquiry.");
      }
    } catch (error) {
      setStatusMessage("An error occurred while submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full py-10 bg-gray-400 px-6">
      <div className="bg-black w-full max-w-2xl p-6 rounded-lg shadow-md text-white">
        <h1 className="text-3xl font-bold text-center underline mb-6">
          Contact Us
        </h1>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Hostel Room Inquiry Form
        </h2>
        <p className="text-center mb-8">
          Please fill in the details below to inquire about a hostel room.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-700"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-700"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone_number"
              className="block mb-2 text-sm font-medium"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone_number"
              className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-700"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="room_type"
              className="block mb-2 text-sm font-medium"
            >
              Room Type
            </label>
            <div className="flex space-x-2 border-[3px] border-purple-400 rounded-xl select-none">
              <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                <input
                  type="radio"
                  name="room_type"
                  value="single"
                  checked={roomType === "single"}
                  onChange={() => setRoomType("single")}
                  className="peer hidden"
                />
                <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[#e06969] peer-checked:to-[#f54d4d] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
                  Single Room
                </span>
              </label>

              <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                <input
                  type="radio"
                  name="room_type"
                  value="double"
                  checked={roomType === "double"}
                  onChange={() => setRoomType("double")}
                  className="peer hidden"
                />
                <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[#e56388] peer-checked:to-[#f04949] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
                  Double Room
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white p-3 rounded-md text-lg hover:bg-red-600 focus:outline-none"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Inquiry"}
          </button>
        </form>

        {statusMessage && (
          <p className="mt-6 text-center text-gray-400">{statusMessage}</p>
        )}
      </div>
    </div>
  );
};

export default HostelInquiryForm;
