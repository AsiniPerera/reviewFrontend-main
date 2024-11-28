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

const ViewReview: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]); // State to hold the books data
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading
  const storedUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:8080/reviews"); // API call for fetching all reviews
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setBooks(data); // Set the reviews data into the state
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false); // Set loading to false once the fetch is done
      }
    };

    if (storedUserId) {
      console.log("Retrieved User ID:", storedUserId); // Optionally log the retrieved user ID
    } else {
      console.log("No ID found in localStorage.");
    }

    fetchReviews(); // Call the fetch function to load reviews
  }, []); // Empty dependency array to run this effect only once

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while fetching
  }

  return (
    <div>
      <div className="center-table-content">
        <div className="table-responsive">
          <table
            className="table table-bordered table-hover"
            style={{ margin: "0 auto" }}
          >
            <thread className="thead-dark">
              <tr>
                <th id="th1">Book Name</th>
                <th id="th1">Author</th>
                <th id="th1">Rating</th>
                <th id="th1">Text Review</th>
                <th id="th1">Date</th>
              </tr>
            </thread>
            <body>
              {books.map((book) => (
                <tr key={book.reviewId}>
                  <td>{book.bookname}</td>
                  <td>{book.author}</td>
                  <td>{book.rating}</td>
                  <td>{book.textreview}</td>
                  <td>{book.date}</td>
                </tr>
              ))}
            </body>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewReview;
