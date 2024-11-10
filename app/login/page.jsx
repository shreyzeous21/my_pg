/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // Importing Framer Motion

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  // Fetch the credentials from environment variables
  const ADMIN_USERNAME = process.env.NEXT_PUBLIC_AUTH_EMAIL;
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_AUTH_PASSWORD;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check the credentials against environment variables
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Store user login status in localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("role", "admin"); // Simple role check for admin
      router.push("/dashboard"); // Redirect to the dashboard after successful login
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <motion.div
      className="h-auto lg:w-[60vw] mx-auto justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-full flex items-center justify-center py-14 flex-grow ">
        <motion.div
          className="p-8 rounded-lg  max-w-md w-full"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src="/logo.svg"
            className="h-10 w-10 justify-center mx-auto flex mb-6"
            alt="Logo"
          />
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Admin Login
          </h2>

          {/* Error message with animation */}
          {error && (
            <motion.p
              className="text-red-500 mb-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </motion.p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              class="bg-white text-center w-full rounded-2xl h-14 relative text-black text-xl font-semibold group"
              type="submit"
            >
              <div className="bg-black rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-full z-10 duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1024 1024"
                  height="25px"
                  width="25px"
                >
                  <path
                    d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                    fill="#ffff"
                  ></path>
                  <path
                    d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                    fill="#ffff"
                    transform="scale(-1, 1) translate(-502, 0)"
                  ></path>
                </svg>
              </div>
              <p className="translate-x-2">Login</p>
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
