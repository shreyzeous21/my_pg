/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Lock, Wifi, House, Droplets, Cable } from "lucide-react";
import RoomList from "../components/RoomList";
import Reviews from "../components/Reviews";

const Home = () => {
  return (
    <main className="h-auto mx-auto flex flex-col">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-96 flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/hotel.jpg')" }}
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">
            Your Perfect Home Away From Home
          </h1>
          <p className="text-xl mb-8">Comfortable and Affordable PG Rooms</p>
          <a
            href="/rooms"
            className="bg-red-500 text-white py-3 px-6 rounded-md text-lg hover:bg-red-600"
          >
            Book Your Room Now
          </a>
        </div>
      </section>

      {/* Room Listings */}
      <RoomList />

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 24/7 Security Feature */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center items-center text-5xl text-red-500 mb-4">
                <Lock />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Security</h3>
              <p className="text-gray-600">
                Safe and secure environment with round-the-clock surveillance.
              </p>
            </div>
            {/* High-Speed Wi-Fi Feature */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center items-center text-5xl text-red-500 mb-4">
                <Wifi />
              </div>
              <h3 className="text-xl font-semibold mb-2">High-Speed Wi-Fi</h3>
              <p className="text-gray-600">
                Stay connected with fast internet throughout the property.
              </p>
            </div>
            {/* Housekeeping Feature */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center items-center text-5xl text-red-500 mb-4">
                <House />
              </div>
              <h3 className="text-xl font-semibold mb-2">Housekeeping</h3>
              <p className="text-gray-600">
                Regular cleaning services to keep your living space neat and
                tidy.
              </p>
            </div>
            {/* Water Feature */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center items-center text-5xl text-red-500 mb-4">
                <Droplets />
              </div>
              <h3 className="text-xl font-semibold mb-2">Water Supply</h3>
              <p className="text-gray-600">
                Access to clean drinking water and modern bathroom facilities.
              </p>
            </div>
            {/* Generator Facility Feature */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center items-center text-5xl text-red-500 mb-4">
                <Cable />
              </div>
              <h3 className="text-xl font-semibold mb-2">Generator Facility</h3>
              <p className="text-gray-600">
                Uninterrupted power supply for a hassle-free living experience &
                Inverters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Reviews />

      {/* Pricing Section */}
      <section className="py-12 bg-white">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Affordable Pricing</h2>
          <p className="text-xl mb-8">
            Choose the best option for you and enjoy a hassle-free living
            experience.
          </p>
          <a
            href="/rooms"
            className="bg-red-500 text-white py-3 px-6 rounded-md text-lg hover:bg-red-600"
          >
            Check Room Availability
          </a>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-12 bg-white">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Location</h2>
          <div className="mb-6">
            <p className="text-lg">
              Located near universities, metro stations, and IT hubs.
            </p>
          </div>
          <div className="h-64 bg-white rounded-lg mb-6">
            {/* Embed Google Map (or use an image for now) */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d560.8995547456226!2d77.4941956859611!3d28.754184824279413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf5fa60bdb237%3A0xd2682f4497e245a8!2sShrey%20lunch%20and%20dinner%20pg!5e1!3m2!1sen!2sin!4v1731229094880!5m2!1sen!2sin"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
