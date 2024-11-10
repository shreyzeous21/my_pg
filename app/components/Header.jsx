/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation"; // Import usePathname
import { MessageCircle, PhoneCall } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get the current pathname

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = ["Home", "About Us", "Rooms", "Contact Us", "Food", ""];

  // Helper function to check if the current link is active
  const isActive = (href) => pathname === href;

  return (
    <motion.div
      className="flex justify-between mx-auto items-center bg-black text-white py-5 px-5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo Section */}
      <div className="flex flex-row items-center">
        <img
          src="/logo.svg"
          alt="Logo"
          className="h-12 w-auto text-white bg-white mx-1"
        />
        <Link href="/" className="text-2xl font-bold">
          Friendly <span className="text-red-500">PG</span>
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden lg:flex">
        <ul className="flex space-x-4 items-center">
          {navItems.slice(0, -1).map((item, index) => {
            const href =
              item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`;
            return (
              <React.Fragment key={index}>
                <motion.li
                  whileHover={{ scale: 1.1, color: "#ff0000" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={href}
                    className={isActive(href) ? "text-red-500" : ""}
                  >
                    {item}
                  </Link>
                </motion.li>
                {index < navItems.length - 2 && (
                  <span className="text-gray-400">|</span>
                )}
              </React.Fragment>
            );
          })}
        </ul>
      </div>

      {/* Contact or User Section */}
      <motion.div
        whileHover={{ scale: 1.1, color: "#ff0000" }}
        className="flex flex-row gap-2"
      >
        <a
          href="tel:+919720528622"
          className="flex flex-row items-center space-x-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          <PhoneCall size={20} className="text-white" />
          <span>Call Us</span>
        </a>
      </motion.div>

      {/* Hamburger Icon for Mobile */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="focus:outline-none"
        >
          <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-3/4 h-full bg-black text-white p-5 z-50"
          >
            <div className="flex justify-end">
              <button
                onClick={toggleMenu}
                aria-label="Close Menu"
                className="text-white text-2xl"
              >
                &times;
              </button>
            </div>
            <ul className="mt-10 space-y-4 text-lg">
              {navItems.map((item, index) => {
                const href =
                  item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "")}`;
                return (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, color: "#ff0000" }}
                  >
                    <Link
                      href={href}
                      onClick={toggleMenu}
                      className={isActive(href) ? "text-red-500" : ""}
                    >
                      {item}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Header;
