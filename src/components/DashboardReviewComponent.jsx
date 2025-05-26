import React, { useEffect, useState } from "react";
import SidebarComponent from "./SidebarComponent";
import { useParams } from "react-router-dom";
import axios from "axios";

const DashboardReviewComponent = () => {
  const [reviews, setReviews] = useState([]);
  const params = useParams();
  const userId = params.userId;
  const token = localStorage.getItem("Token");

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios.get(`api/user-reviews/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(response.data);
      } catch (error) {
        setReviews([]);
      }
    };
    getReviews();
  }, [userId, token]);

  const displayReviews = (review) => (
    <div key={review.id}> 
      <h3>{review.title}</h3> 
      <p>{review.content}</p>
      <p></p>
     
    </div>
  );

  return (
    <div className="flex">
      <div>
        <SidebarComponent />
      </div>
      <div> 
        {reviews.length === 0 ? (
          <p>No reviews found.</p>
        ) : (
          reviews.map(displayReviews)
        )}
      </div>
    </div>
  );
};

export default DashboardReviewComponent;