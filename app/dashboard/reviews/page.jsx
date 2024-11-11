"use client";

import React, { useEffect, useState } from "react";

const Page = () => {
  const [reviews, setReviews] = useState([]); // Use regular JS array for reviews
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all reviews on component mount
  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews");
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data = await response.json(); // The API response should be an array of reviews
      setReviews(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Delete review function with optimistic UI update
  const deleteReview = async (id) => {
    const originalReviews = [...reviews]; // Create a copy of the current reviews

    // Optimistically update the UI by removing the review
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== id)
    );

    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete review");
      }

      // If successful, clear any existing errors
      setError(null);
    } catch (err) {
      console.error("Error deleting review:", err);
      setReviews(originalReviews); // Rollback to original state if deletion fails
      setError(err.message || "Failed to delete review");
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading reviews...</div>;
  }

  return (
    <div className="p-6 font-sans bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-green-600 mb-4">Reviews</h2>

      {/* Display error message */}
      {error && (
        <div className="text-red-500 mb-4">
          <strong>{error}</strong>
        </div>
      )}

      {/* Show loading message during deletion */}
      {loading && (
        <p className="text-gray-500">Deleting review... Please wait.</p>
      )}

      {/* Display reviews or message if none exist */}
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews found.</p>
      ) : (
        <div className="max-h-96 overflow-y-auto scrollbar-hidden">
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li
                key={review.id}
                className="p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-300"
              >
                <div className="flex flex-col space-y-2">
                  <p className="text-lg font-bold text-gray-800">
                    <strong>{review.name}</strong>
                  </p>
                  <p className="text-sm text-gray-600">{review.reviewText}</p>
                </div>

                <button
                  onClick={() => deleteReview(review.id)}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Page;
