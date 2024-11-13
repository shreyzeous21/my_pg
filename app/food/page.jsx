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
    <>
      <div className="mx-auto flex flex-col px-10 py-10 bg-white h-auto w-full">
        <div className="flex flex-col py-10">
          <div className="text-4xl leading-snug  text-black">{currentDate}</div>
          <h1 className="text-xl font-bold">
            Food <span className="text-[#ff0000]">Zone </span>
          </h1>
        </div>

        <div className="flex  flex-col  justify-center items-center w-full py-4 px-6 rounded-lg shadow-md">
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
      </div>
    </>
  );
};

export default Page;
