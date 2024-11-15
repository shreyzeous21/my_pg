/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { X } from "lucide-react";

const Page = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [state, handleSubmit] = useForm("mkgnbgpb");

  // New state to track selected meal
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [formStatus, setFormStatus] = useState(""); // To track form submission status
  const [menuItems, setMenuItems] = useState(null); // State for menu data
  const [showQRCode, setShowQRCode] = useState(false);

  const handlePaymentClick = () => {
    setShowQRCode(true); // Show the QR code on button click
  };

  const handleCloseQRCode = () => {
    setShowQRCode(false); // Close the QR code section
  };
  useEffect(() => {
    const formatDate = () => {
      const options = {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      };
      const date = new Date();
      setCurrentDate(date.toLocaleDateString("en-GB", options));
    };

    formatDate();
    setInterval(() => {
      formatDate();
    }, 1000 * 60 * 60 * 24);

    // Fetching the menu items from the JSON file
    fetch("/menuItems.json")
      .then((response) => response.json())
      .then((data) => setMenuItems(data))
      .catch((error) => console.error("Error loading menu items:", error));
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(e);

    // Update form status based on success/failure
    if (state.succeeded) {
      setFormStatus("Thanks for your message. We are expecting you!");
    } else if (state.errors.length > 0) {
      setFormStatus(
        "There was an error submitting the form. Please try again."
      );
    }
  };

  // Ensure menuItems are loaded before rendering
  if (!menuItems) {
    return <div>Loading...</div>; // Show loading message until menuItems are loaded
  }

  return (
    <div className="mx-auto flex flex-col px-10 py-10 bg-white h-auto w-full">
      <div className="flex flex-col py-10">
        <div className="text-4xl leading-snug text-black">{currentDate}</div>
        <h1 className="text-xl font-bold flex-col">
          <p>
            Food <span className="text-[#ff0000]">Zone </span>
          </p>
          <p>
            Deepa PG <span className="text-[#ff0000]">Lunch & Dinner </span>
          </p>
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center w-full py-4 px-6 rounded-lg shadow-md">
        <div className="flex justify-between w-full items-center gap-2 flex-col lg:flex-row">
          <p className="text-sm font-semibold text-black">
            Let`s eat, Welcome to our Food Zone →
          </p>
          <a
            href="tel:+91-9720528622"
            className="text-sm font-semibold bg-red-500 rounded-lg p-4 text-black"
          >
            Call Us: +91-9720528622
          </a>
        </div>
      </div>

      {/* Food Timing Section */}
      <div className="h-auto flex flex-col justify-center py-10 w-full text-black">
        <div className="text-center text-4xl font-bold text-black mb-6">
          <p className="text-red-500">Food Timing</p>

          <p className="text-sm text-red-500 mt-2">
            Serving you with the best home-cooked meals
          </p>
        </div>

        {/* Meal Selection (Lunch or Dinner) */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-6">
          <div
            className="bg-white text-center p-6 md:p-8 rounded-lg shadow-lg w-full md:w-56 hover:scale-105 transform transition-all duration-300 cursor-pointer"
            onClick={() =>
              setSelectedMeal(selectedMeal === "lunch" ? null : "lunch")
            } // Toggle lunch menu visibility
          >
            <p className="text-xl md:text-2xl font-semibold text-red-500 mb-2">
              Lunch
            </p>
            <p className="text-md md:text-lg text-black mb-3">
              12:00 PM - 2:00 PM
            </p>
            <p className="text-sm text-gray-500">
              Tap to view our delicious lunch menu!
            </p>
          </div>

          <div
            className="bg-white text-center p-6 md:p-8 rounded-lg shadow-lg w-full md:w-56 hover:scale-105 transform transition-all duration-300 cursor-pointer"
            onClick={() =>
              setSelectedMeal(selectedMeal === "dinner" ? null : "dinner")
            } // Toggle dinner menu visibility
          >
            <p className="text-xl md:text-2xl font-semibold text-red-500 mb-2">
              Dinner
            </p>
            <p className="text-md md:text-lg text-black mb-3">
              7:30 PM - 10:00 PM
            </p>
            <p className="text-sm text-gray-500">
              Tap to see what’s cooking for dinner!
            </p>
          </div>
        </div>

        {/* Conditional Rendering of Menu Items */}
        {selectedMeal && (
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold text-black mb-4">
              {selectedMeal === "lunch" ? "Lunch Menu" : "Dinner Menu"}
            </h3>

            {/* Responsive Table Layout */}
            <div className="w-full max-w-4xl mx-auto mb-8">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 text-red-500">Dish Name</th>
                    <th className="text-left p-2 text-red-500">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems[selectedMeal].map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Contact Form Section for Students */}
      <div className="h-auto flex flex-col justify-center py-10 w-auto">
        <div className="text-center text-3xl font-bold text-black mb-6">
          <p className="text-red-500">Contact Us</p>
          <p className="text-sm text-red-500 mt-2">
            Send us a message to let us know you’re coming!
          </p>
        </div>

        {/* Formspree Contact Form */}
        <form
          onSubmit={handleFormSubmit} // Use the updated submit handler
          className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg"
        >
          <div className="grid grid-cols-1 gap-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your full name"
                required
              />
              <ValidationError
                prefix="Name"
                field="name"
                errors={state.errors}
              />
            </div>

            {/* Meal Option (Lunch or Dinner) */}
            <div>
              <label
                htmlFor="meal"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Select Meal Option
              </label>
              <select
                id="meal"
                name="meal"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              >
                <option value="">Choose Meal</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
              <ValidationError
                prefix="Meal"
                field="meal"
                errors={state.errors}
              />
            </div>

            {/* Branch & Message */}
            <div className="col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Branch & Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your branch and any additional message"
                required
              />
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              disabled={state.submitting}
              className="bg-red-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-red-600 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Form Status Message */}
        {formStatus && (
          <div className="mt-4 text-center text-xl font-semibold text-green-500">
            {formStatus}
          </div>
        )}
      </div>

      <div className="h-auto flex flex-col justify-center py-10 w-full">
        {/* Payment Section Title */}
        <div className="text-center text-3xl font-bold text-black mb-6">
          <p className="text-red-500">Make a Payment</p>
          <p className="text-sm text-red-500 mt-2">
            Secure your reservation by completing your payment.
          </p>
        </div>

        {/* Payment Button */}
        <div className="flex justify-center">
          <button
            onClick={handlePaymentClick}
            className="bg-red-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-red-600 focus:outline-none"
          >
            Proceed to Payment
          </button>
        </div>

        {/* QR Code Display with Close Button */}
        {showQRCode && (
          <div className="relative flex justify-center lg:h-[70vh] lg:w-[50vw] mx-auto mt-6">
            {/* Close Button */}
            <button
              onClick={handleCloseQRCode}
              className="absolute  p-2 bg-white rounded-full shadow-lg z-10" // Adjusted for better positioning
            >
              <X className="text-red-500" size={24} /> {/* X icon */}
            </button>

            {/* QR Code */}
            <img
              src="/qr.jpeg" // Replace with the actual path to your QR code image
              alt="QR Code for Payment"
              className="object-cover bg-center" // Ensure image covers the container
            />
          </div>
        )}

        {/* Additional Payment Assistance Text */}
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            For assistance with payments, please contact us at{" "}
            <a
              href="tel:+919720528622"
              className="underline font-bold text-red-500"
            >
              +91-9720528622
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
