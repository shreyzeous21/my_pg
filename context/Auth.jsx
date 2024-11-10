"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

// Create context
const AuthContext = createContext();

// AuthProvider component to wrap the app and provide context
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(""); // Store user email
  const router = useRouter();

  // Get correct email and password from environment variables
  const correctEmail = process.env.NEXT_PUBLIC_AUTH_EMAIL;
  const correctPassword = process.env.NEXT_PUBLIC_AUTH_PASSWORD;

  // Check localStorage for session on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setIsAuthenticated(true);
      setUserEmail(storedEmail);
      router.push("/dashboard"); // Redirect to dashboard if already logged in
    }
  }, []);

  const login = (email, password) => {
    if (email === correctEmail && password === correctPassword) {
      setIsAuthenticated(true);
      setUserEmail(email); // Store email in context
      localStorage.setItem("userEmail", email); // Store email in localStorage
      router.push("/dashboard"); // Redirect to the dashboard after login
    } else {
      alert("Incorrect email or password. Please try again.");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(""); // Clear email in context
    localStorage.removeItem("userEmail"); // Remove session from localStorage
    router.push("/"); // Redirect to home page after logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use authentication context
export const useAuth = () => useContext(AuthContext);
