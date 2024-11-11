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
    return <div>Loading reviews...</div>;
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-6 overflow-y-auto max-h-screen">
        <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
        <ul className="space-y-4">
          {reviews.length === 0 ? (
            <li>No reviews available</li>
          ) : (
            reviews.map((review) => (
              <li
                key={review.id}
                className="border p-4 rounded-md flex justify-between items-center"
              >
                <div>
                  <p className="font-bold">{review.name}</p>
                  <p>{review.reviewText}</p>
                </div>
                <button
                  onClick={() => deleteReview(review.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default Page;
