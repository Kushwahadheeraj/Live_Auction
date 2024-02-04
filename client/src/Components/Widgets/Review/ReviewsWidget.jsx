import React, { useState, useEffect } from 'react';
import './Reviews.css';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

ReviewsWidget.propTypes = {
  _id : PropTypes.string.isRequired
}


function ReviewsWidget({_id}) {
  const [postUser, setPostUser] = useState('');
  const navigate = useNavigate();
  const getUser = async() => {
    const response = await fetch(`http://localhost:3001/users/${_id}`, {
      method: 'GET',
    });
    const data = await response.json();
    setPostUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);
  console.log(postUser);
  return (
    <div>
      {postUser && postUser.reviews && postUser.reviews.map((review, index) => (
        <div className="review-container" key={index}>
          <div className="profile-pic"></div>
          <div className="review-details">
            <p onClick={() => {navigate(`/profile/${review.reviewUserID}`)}} className="reviewer-name">{review.reviewName}</p>
            <p className="review-text">{review.review}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewsWidget;