import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "./dt.css";
import { GiClick } from "react-icons/gi";
import { IoLibrarySharp } from "react-icons/io5";
import { MdLocalLibrary } from "react-icons/md";
import { TbWorldUpload } from "react-icons/tb";
import { MdDeleteSweep } from "react-icons/md";
import AddReview from "./AddReviewForm";
import ViewReviews from "./ViewReview";
import UpdateReviews from "./UpdateReview";
import DeleteReviews from "./DeleteReview";
import CardAtom from "../Atoms/CardAtom";
import { VscBlank } from "react-icons/vsc";

function Home() {
  // Set 'View Reviews' as the default popupOpen state
  const [popupOpen, setPopupOpen] = useState<string | null>("View Reviews");

  const togglePopup = (popupType: string) => {
    // Toggle the popup only if it's different from the current one
    if (popupType !== popupOpen) {
      setPopupOpen(popupType);
    }
  };

  const onAddReview = () => {
    // Set the popup to 'View Reviews' after adding a review
    setPopupOpen("View Reviews");
  };

  return (
    <main className={`main-container dark-mode`} style={{ background: "linear-gradient(135deg, #FFF8DE, #C5D3E8)" }}>
      <div>
        <h3 style={{ textAlign: "center", marginBottom: "30px", color: 'black', fontSize: '30px', fontWeight: 'bold' }}>
          Review Management System
        </h3>
      </div>
      <div className="main-cards">
        <CardAtom
          title="View Reviews"
          onClick={() => togglePopup("View Reviews")}
          IconComponent={IoLibrarySharp}
          IconComponent1={VscBlank}
        />
        <CardAtom
          title="Add Review"
          onClick={() => togglePopup("Add Review")}
          IconComponent={MdLocalLibrary}
          IconComponent1={GiClick}
        />
        <CardAtom
          title="Update Review"
          onClick={() => togglePopup("Update Review")}
          IconComponent={TbWorldUpload}
          IconComponent1={GiClick}
        />
        <CardAtom
          title="Delete Review"
          onClick={() => togglePopup("Delete Review")}
          IconComponent={MdDeleteSweep}
          IconComponent1={GiClick}
        />
      </div>
      {/* Render the appropriate popup based on the state */}
      {popupOpen === "Add Review" && <AddReview onAddReview={onAddReview} />}
      {popupOpen === "View Reviews" && <ViewReviews />}
      {popupOpen === "Update Review" && <UpdateReviews />}
      {popupOpen === "Delete Review" && <DeleteReviews />}
    </main>
  );
}

export default Home;
