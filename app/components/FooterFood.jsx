/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { MessageCircle, PhoneCall } from "lucide-react";

const Footer = () => {
  const pathname = usePathname(); // Get the current pathname

  const navItems = ["Home", "About Us", "Rooms", "Contact Us", "Food"];

  // Helper function to check if the current link is active
  const isActive = (href) => pathname === href;

  return (
    <div className="bg-black text-white  py-5 px-2">
      <div className="mx-auto px-2">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo Section */}
          <div className="flex flex-row items-center">
            <img
              src="/foodZone.jpg"
              alt="Logo"
              className="h-12 w-auto text-white bg-white mx-1"
            />
            <Link href="/" className="text-2xl font-bold">
              Food <span className="text-red-500">Zone</span>
            </Link>
          </div>

          {/* Footer Links */}
          <div className="flex flex-row text-left space-x-4 ">
            {navItems.map((item, index) => {
              const href =
                item === "Home"
                  ? "/"
                  : `/${item.toLowerCase().replace(" ", "")}`;
              return (
                <React.Fragment key={index}>
                  <Link
                    href={href}
                    className={`${
                      isActive(href) ? "text-red-500" : "hover:text-red-500"
                    } transition duration-200 ease-in-out`}
                  >
                    {item}
                  </Link>
                  {index < navItems.length - 1 && (
                    <span className="text-gray-400 hidden sm:inline">|</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="flex flex-row gap-2">
            <a
              href="tel:+919720528622"
              className="flex flex-row items-center space-x-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              <PhoneCall size={20} className="text-white" />
              <span>Call Us</span>
            </a>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="text-center text-sm mt-6">
          <Link
            href="/terms-of-service"
            className="text-gray-400 hover:text-white transition duration-200 ease-in-out"
          >
            Terms & Conditions
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400 mt-4">
          &copy; {new Date().getFullYear()} Friendly PG. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
