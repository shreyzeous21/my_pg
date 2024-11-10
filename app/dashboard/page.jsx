"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Auth";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {isAuthenticated ? (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Welcome to the Dashboard
          </h2>
          <p className="text-center mb-6">
            You are logged in and can access the dashboard.
          </p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-semibold">Redirecting to Login...</h2>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
