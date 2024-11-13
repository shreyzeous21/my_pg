/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";

const Page = () => {
  // State to store the formatted date
  const [currentDate, setCurrentDate] = useState("");
  const [state, handleSubmit] = useForm("mkgnbgpb");

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
          <div className="text-center text-3xl font-bold text-black mb-6">
            <p className="text-red-500">Food Timing</p>
            <p className="text-sm text-red-500 mt-2">
              Serving you with the best home-cooked meals
            </p>
          </div>

          {/* Timing Cards */}
          <div className="flex items-center justify-center gap-8">
            {/* Lunch Timing Card */}
            <div className="bg-white text-center p-8 rounded-lg shadow-lg w-56 hover:scale-105 transform transition-all duration-300">
              <p className="text-2xl font-semibold text-red-500 mb-2">Lunch</p>
              <p className="text-lg text-black">12:00 PM - 2:00 PM</p>
            </div>

            {/* Dinner Timing Card */}
            <div className="bg-white text-center p-8 rounded-lg shadow-lg w-56 hover:scale-105 transform transition-all duration-300">
              <p className="text-2xl font-semibold text-red-500 mb-2">Dinner</p>
              <p className="text-lg text-black">7:30 PM - 10:00 PM</p>
            </div>
          </div>
        </div>

        {/* Contact Form Section for Students */}
        <div className="h-auto flex flex-col justify-center py-10 bg-gray-100 w-full">
          <div className="text-center text-3xl font-bold text-black mb-6">
            <p className="text-red-500">Contact Us</p>
            <p className="text-sm text-red-500 mt-2">
              If you have any questions or inquiries, feel free to reach out!
            </p>
          </div>

          {/* Formspree Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

            {state.succeeded && <div className="py-10 text-center text-xl text-green-500 font-semibold">Thanks for your message!</div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
