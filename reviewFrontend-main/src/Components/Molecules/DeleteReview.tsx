import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

interface Review {
  reviewId: number;
  bookname: string;
  author: string;
  rating: string;
  textreview: string;
  date: string;
}

const DeleteReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]); // State for storing reviews
  const [loading, setLoading] = useState<boolean>(true); // Loading state for API call

  useEffect(() => {
    // Fetch reviews on component mount
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:8080/reviews"); // Fetch reviews from the API
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data); // Set the reviews data to state
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch is completed
      }
    };

    fetchReviews(); // Fetch reviews when the component mounts
  }, []);

  const handleDeleteClick = async (reviewId: number) => {
    try {
      // Send DELETE request to remove the review
      const response = await fetch(`http://localhost:8080/reviews/${reviewId}`, {
        method: "DELETE", // DELETE method to remove the review
      });

      if (!response.ok) {
        throw new Error("Failed to delete review");
      }

      // Remove the deleted review from local state
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.reviewId !== reviewId)
      );
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading text until the reviews are fetched
  }

  return (
    <div className="center-table-content">
      <div className="table-responsive">
        <table className="table table-bordered table-hover" style={{ margin: "0 auto" }}>
          <thead className="thead-dark">
            <tr>
              <th>Review Title</th>
              <th>Reviewer</th>
              <th>Rating</th>
              <th>Text Review</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Render review rows */}
            {reviews.map((review) => (
              <tr key={review.reviewId}>
                <td>{review.reviewTitle}</td> {/* Changed from bookname to reviewTitle */}
                <td>{review.reviewer}</td> {/* Changed from author to reviewer */}
                <td>{review.rating}</td>
                <td>{review.textReview}</td> {/* Changed from textreview to textReview */}
                <td>{review.date}</td>
                <td>
                  {/* Delete button */}
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDeleteClick(review.reviewId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeleteReviews;
