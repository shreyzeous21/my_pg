"use client";

import React, { useEffect, useState } from "react";

const Page = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews"); // Adjust the URL if needed
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data); // Assuming the API returns an array of reviews
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
              <li key={review.id} className="border p-4 rounded-md">
                <p className="font-bold">{review.name}</p>
                <p>{review.reviewText}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Page;
