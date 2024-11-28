import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { MdLocalLibrary } from "react-icons/md";

interface AddReviewProps {
  onAddReview: (review: {
    bookname: string;
    author: string;
    rating: string;
    textreview: string;
    date: string;
  }) => void;
}

const AddReview: React.FC<AddReviewProps> = ({ onAddReview }) => {
  const [bookname, setBookname] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [textreview, setTextreview] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const storedUserId = localStorage.getItem("userId");
  const userId = storedUserId ? parseInt(storedUserId, 10) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userId === null) {
      setError("User ID is missing or invalid.");
      return;
    }

    const reviewData = {
      bookname,
      author,
      rating,
      textreview,
      date,
    };

    console.log("Submitting review:", reviewData);
    setLoading(true);
    setSuccessMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:8080/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      onAddReview(reviewData);

      setBookname("");
      setAuthor("");
      setRating("");
      setTextreview("");
      setDate("");

      setSuccessMessage("Review added successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      setError("Failed to add review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <MdLocalLibrary size={140} color="#54473F" />
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <label htmlFor="bookname" style={{ color: "black" }}>
          Book Name:
          <input
            type="text"
            id="bookname"
            value={bookname}
            onChange={(e) => setBookname(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </label>
        <label htmlFor="author" style={{ color: "black" }}>
          Author:
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </label>
        <label htmlFor="rating" style={{ color: "black" }}>
          Rating /5:
          <input
            type="text"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </label>
        <label htmlFor="textreview" style={{ color: "black" }}>
          Text Review:
          <textarea
            id="textreview"
            value={textreview}
            onChange={(e) => setTextreview(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </label>
        <label htmlFor="date" style={{ color: "black" }}>
          Date:
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </label>
        <button
          type="submit"
          disabled={loading || !bookname || !author || !rating || !textreview}
          style={{
            padding: "10px",
            backgroundColor: "#54473F",
            color: "white",
            cursor: "pointer",
            border: "none",
            borderRadius: "4px",
          }}
        >
          {loading ? "Adding..." : "Add Review"}
        </button>
        {error && <div className="text-danger">{error}</div>}
        {successMessage && <div className="text-success">{successMessage}</div>}
      </form>
    </div>
  );
};

export default AddReview;
