"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Page = () => {
  // State to store the formatted date
  const [currentDate, setCurrentDate] = useState("");

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
  }, []);

  return (
    <div className="flex justify-center items-center py-6 bg-gray-100">
      <div className="flex flex-col items-center space-y-2">
        {/* Logo Image */}
        <Image
          src="/foodZone.jpg"
          height={40}
          width={40}
          alt="Food Zone Logo"
          className="object-contain"
        />

        {/* Logo Text */}
        <h1 className="text-4xl font-bold text-gray-800">Food Zone</h1>

        {/* Current Date */}
        <p className="text-lg text-gray-600">{currentDate}</p>
      </div>
    </div>
  );
};

export default Page;
