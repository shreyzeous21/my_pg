import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";

const Reviews = () => {
  const [reviews, setReviews] = useState([]); // State to store reviews
  const [loading, setLoading] = useState(true); // State for loading state
  const [error, setError] = useState(null); // State for error state
  const [reviewText, setReviewText] = useState(""); // State for review text
  const [name, setName] = useState(""); // State for reviewer name
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility

  // Fetch reviews from the API
  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews");
      if (response.ok) {
        const data = await response.json();
        setReviews(data); // Update the reviews state
      } else {
        setError("Failed to fetch reviews.");
      }
    } catch (err) {
      setError("An error occurred while fetching reviews.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch reviews when the component is mounted
  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make sure both name and reviewText are provided
    if (!name || !reviewText) {
      alert("Please fill in both your name and review.");
      return;
    }

    // Send a POST request to add the review
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          reviewText: reviewText,
        }),
      });

      if (response.ok) {
        const newReview = await response.json();
        setReviews((prevReviews) => [newReview, ...prevReviews]); // Add the new review to the list
        setReviewText(""); // Clear the review text input
        setName(""); // Clear the name input
        setIsModalOpen(false); // Close the modal after submitting the review
      } else {
        setError("Failed to submit review.");
      }
    } catch (err) {
      setError("An error occurred while submitting the review.");
    }
  };

  // Modal Component for adding a review
  const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // Don't render modal if not open
    return (
      <div className="fixed inset-1 flex justify-center items-center z-50">
        <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h3 className="text-2xl font-bold mb-4">Add Your Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="reviewText"
                className="block text-lg font-medium text-gray-700"
              >
                Your Review
              </label>
              <textarea
                id="reviewText"
                name="reviewText"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Write your review here..."
                rows="4"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching reviews
  }

  if (error) {
    return <div>{error}</div>; // Show an error message if something went wrong
  }

  return (
    <div>
      <section className="py-12 bg-gray-400">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">What Our Hosteler`s Say</h2>
          <Swiper
            spaceBetween={30} // Space between slides
            centeredSlides={true} // Center the active slide
            autoplay={{
              delay: 2500, // Auto transition every 2.5 seconds
              disableOnInteraction: false, // Don't stop autoplay on interaction
            }}
            pagination={{
              clickable: true, // Make pagination clickable
            }}
            modules={[Autoplay, Pagination]} // Import required modules
            loop={true} // Loop the slides
            slidesPerView={1} // Show 1 slide per view by default
            breakpoints={{
              640: {
                slidesPerView: 1, // 1 slide on small screens (mobile)
              },
              768: {
                slidesPerView: 2, // 2 slides on medium screens (tablets)
              },
              1024: {
                slidesPerView: 3, // 3 slides on large screens (desktops)
              },
            }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="bg-gray-200 p-6 rounded-lg shadow-md flex flex-col h-[30vh] lg:h-[30vh]">
                  <p className="text-gray-700 mb-4 flex-grow">{`"${review.reviewText}"`}</p>
                  <p className="font-semibold text-gray-800">{review.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Move the "Add Your Review" button to below the Swiper component */}
      <div className="text-center py-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Add Your Review
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Reviews;
