import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";

interface Review {
  reviewId: number;
  bookname: string;
  author: string;
  rating: string;
  textreview: string;
  date: string;
}

const UpdateReviews: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<Review[]>([]); // Changed 'books' to 'reviews'
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [updatedReview, setUpdatedReview] = useState<Review | null>(null); // Changed 'updatedBook' to 'updatedReview'

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:8080/reviews"); // Correct endpoint to fetch all reviews
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data); // Set the reviews data
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false); // Set loading to false once the fetch is done
      }
    };

    fetchReviews(); // Call the fetch function
  }, []);

  const handleEditClick = (review: Review) => {
    setEditingRow(review.reviewId); // Set the editing row to the clicked review's id
    setUpdatedReview({ ...review }); // Initialize updatedReview with the current review data
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (updatedReview) {
      const { name, value } = e.target;
      setUpdatedReview({
        ...updatedReview,
        [name]: value,
      });
    }
  };

  const handleSaveClick = async () => {
    if (updatedReview) {
      try {
        // Send PUT request to update the review in the API
        const response = await fetch(
          `http://localhost:8080/reviews/${updatedReview.reviewId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedReview),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update review");
        }

        // Update the review in the local state correctly
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.reviewId === updatedReview.reviewId ? updatedReview : review
          )
        );
        setEditingRow(null); // Reset editing row
        setUpdatedReview(null); // Clear updated review data
      } catch (error) {
        console.error("Error updating review:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="center-table-content">
      <div className="table-responsive">
        <table
          className="table table-bordered table-hover"
          style={{ margin: "0 auto" }}
        >
          <thead className="thead-dark">
            <tr>
              <th>Review Title</th> {/* Changed from Book Name */}
              <th>Reviewer</th> {/* Changed from Author */}
              <th>Rating</th>
              <th>Text Review</th> {/* Changed from Text-Review */}
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Render the edit row if a review is being edited */}
            {editingRow && updatedReview && (
              <tr>
                <td>{updatedReview.reviewId}</td>
                <td>
                  <input
                    type="text"
                    name="reviewTitle" // Changed from bookname to reviewTitle
                    value={updatedReview.reviewTitle}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="reviewer" // Changed from author to reviewer
                    value={updatedReview.reviewer}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="rating"
                    value={updatedReview.rating}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <textarea
                    name="textReview" // Changed from textreview to textReview
                    value={updatedReview.textReview}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="date"
                    value={updatedReview.date}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <button className="btn btn-success" onClick={handleSaveClick}>
                    Save
                  </button>
                </td>
              </tr>
            )}
            {/* Render the review rows */}
            {reviews.map((review) => (
              <tr key={review.reviewId}>
                <td>{review.reviewTitle}</td> {/* Changed from bookname to reviewTitle */}
                <td>{review.reviewer}</td> {/* Changed from author to reviewer */}
                <td>{review.rating}</td>
                <td>{review.textReview}</td> {/* Changed from textreview to textReview */}
                <td>{review.date}</td>
                <td>
                  <button
                    className="btn btn-outline-success"
                    onClick={() => handleEditClick(review)}
                  >
                    Update
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

export default UpdateReviews;
