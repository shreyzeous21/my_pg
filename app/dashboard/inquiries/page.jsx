"use client"
import React, { useState, useEffect } from "react";

const InquiryForm = () => {
  const [inquiries, setInquiries] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add a loading state for better UX

  // Fetch all inquiries when component mounts
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await fetch("/api/inquiry");
        const data = await response.json();
        if (response.ok) {
          setInquiries(data.inquiries || []);
        } else {
          setError(data.message || "Failed to fetch inquiries");
        }
      } catch (err) {
        setError("Failed to fetch inquiries");
      }
    };

    fetchInquiries();
  }, []);

  // Handle delete inquiry with optimistic UI update
  const handleDelete = async (id) => {
    // Save the original state to rollback in case of an error
    const originalInquiries = [...inquiries];

    // Optimistically update the UI by removing the inquiry
    setInquiries((prevInquiries) =>
      prevInquiries.filter((inquiry) => inquiry.id !== id)
    );

    setLoading(true); // Set loading to true when deleting

    try {
      const response = await fetch(`/api/inquiry/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete inquiry");
      }

      // Reset loading state after successful delete
      setLoading(false);
      setError(null); // Clear any previous error messages
    } catch (err) {
      // Rollback and show error if deletion fails
      console.error("Error deleting inquiry:", err);
      setInquiries(originalInquiries); // Rollback to original state
      setLoading(false); // Reset loading state
      setError(err.message || "Error deleting inquiry");
    }
  };

  return (
    <div className="p-6 font-sans bg-white rounded-lg shadow-lg">
      {/* Main Heading for Inquiries */}
      <h2 className="text-4xl font-bold text-red-600 mb-6 border-b-4 border-red-200 pb-2">
        Inquiries
      </h2>

      {/* Display error message */}
      {error && (
        <div className="text-red-500 bg-red-100 p-4 rounded-lg mb-4">
          <strong>{error}</strong>
        </div>
      )}

      {/* Subheading for Existing Inquiries */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Existing Inquiries
      </h3>

      {/* Show loading message during deletion */}
      {loading && (
        <p className="text-gray-500 mb-4">Deleting inquiry... Please wait.</p>
      )}

      {/* Display inquiries or message if none exist */}
      {inquiries.length === 0 ? (
        <p className="text-gray-500">No inquiries found.</p>
      ) : (
        <ul className="space-y-4">
          {inquiries.map((inquiry) => (
            <li
              key={inquiry.id}
              className="p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-300"
            >
              <div className="flex flex-col space-y-2">
                <p className="text-lg font-bold text-gray-800">
                  <strong>{inquiry.name}</strong> - {inquiry.roomType}
                </p>
                <p className="text-sm text-gray-600">{inquiry.email}</p>
                <p className="text-sm text-gray-600">{inquiry.phoneNumber}</p>
              </div>

              <button
                onClick={() => handleDelete(inquiry.id)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                disabled={loading} // Disable the button while loading
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InquiryForm;
