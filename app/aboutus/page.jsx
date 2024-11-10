"use client";
import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <motion.div
      className="container mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* About Us Header */}
      <h1 className="text-3xl font-bold text-center mb-6 underline">
        About Us
      </h1>

      {/* Introduction */}
      <p className="text-lg text-gray-700 mb-4">
        Welcome to Friendly PG! We offer comfortable and affordable living
        spaces for students and working professionals. Our goal is to provide a
        safe and welcoming environment with all the necessary amenities to make
        your stay stress-free and enjoyable.
      </p>

      {/* Our Mission */}
      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
        Our Mission
      </h2>
      <p className="text-lg text-gray-700 mb-4">
        At Friendly PG, we strive to provide more than just a place to stay. We
        believe in creating a community where people feel at home. Whether
        you’re looking for a private room or a shared space, we have options to
        fit your needs. Our properties come equipped with modern amenities,
        security, and a friendly atmosphere.
      </p>

      {/* Our Values */}
      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
        Our Values
      </h2>
      <ul className="list-disc list-inside text-lg text-gray-700">
        <li>Comfortable and affordable living spaces</li>
        <li>24/7 security and safety</li>
        <li>Access to essential amenities like Wi-Fi and laundry</li>
        <li>Clean and hygienic environments</li>
        <li>Flexible living options for both short and long stays</li>
      </ul>

      {/* Call to Action */}
      <div className="text-center mt-6">
        <h3 className="text-lg text-gray-800 mb-2">
          Interested in Staying with Us?
        </h3>
        <a
          href="/contactus"
          className="inline-block px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
        >
          Contact Us
        </a>
      </div>
    </motion.div>
  );
};

export default AboutUs;
