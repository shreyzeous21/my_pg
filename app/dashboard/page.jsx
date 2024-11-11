"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Reviews from "./reviews/page";
import Inquiries from "./inquiries/page";
import { Menu, X } from "lucide-react";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [currentSection, setCurrentSection] = useState("reviews"); // Default section
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track sidebar state
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated and has the correct role
    const authStatus = localStorage.getItem("isAuthenticated");
    const userRole = localStorage.getItem("role");

    if (authStatus === "true" && userRole === "admin") {
      setIsAuthenticated(true);
      setRole(userRole);
    } else {
      router.push("/login"); // Redirect to login if not authenticated or not an admin
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");
    router.push("/login"); // Redirect to login page after logout
  };

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {isAuthenticated ? (
        <div className="flex w-full">
          {/* Left Sidebar */}
          <div
            className={`${
              isSidebarOpen ? "block" : "hidden"
            } md:block w-64 bg-gray-800 text-white h-auto p-4`}
          >
            <h2 className="text-xl font-semibold text-center mb-8">
              Admin Dashboard
            </h2>
            <ul className="space-y-6">
              {/* Manage Reviews Section */}
              <li>
                <button
                  onClick={() => setCurrentSection("reviews")}
                  className={`w-full text-left py-2 px-4 rounded-md ${
                    currentSection === "reviews"
                      ? "bg-gray-700"
                      : "hover:bg-gray-700"
                  } transition-colors`}
                >
                  Manage Reviews
                </button>
              </li>

              {/* Inquiries Section */}
              <li>
                <button
                  onClick={() => setCurrentSection("inquiries")}
                  className={`w-full text-left py-2 px-4 rounded-md ${
                    currentSection === "inquiries"
                      ? "bg-gray-700"
                      : "hover:bg-gray-700"
                  } transition-colors`}
                >
                  Inquiries Form
                </button>
              </li>

              {/* Rooms Section */}
              <li>
                <button
                  onClick={() => setCurrentSection("rooms")}
                  className={`w-full text-left py-2 px-4 rounded-md ${
                    currentSection === "rooms"
                      ? "bg-gray-700"
                      : "hover:bg-gray-700"
                  } transition-colors`}
                >
                  Rooms
                </button>
              </li>

              {/* Logout Button */}
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-4 rounded-md bg-red-600 hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            {/* Hamburger Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleSidebar}
                className="text-gray-800 focus:outline-none"
              >
                {isSidebarOpen ? <X size={30} /> : <Menu size={30} />}
              </button>
            </div>

            {currentSection === "reviews" && (
              <div>
                <Reviews />
              </div>
            )}

            {currentSection === "inquiries" && (
              <div>
                <Inquiries />
              </div>
            )}

            {currentSection === "rooms" && (
              <div>
                <h3 className="text-2xl font-semibold mb-4">Rooms</h3>
                {/* Add your rooms content here */}
                <p>Rooms management content goes here.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center w-full h-screen flex items-center justify-center">
          <h2 className="text-xl font-semibold">Redirecting to Login...</h2>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
