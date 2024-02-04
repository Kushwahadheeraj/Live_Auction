import React from 'react'
import Navbar from '../Components/NavBar/NavBar'
import Footer from '../Components/Footer/Footer'
import { useSelector } from 'react-redux';
import { Typography, Divider } from "@mui/material";
import FlexBetween from '../Components/FlexBetween/FlexBetween';
import PropTypes from 'prop-types';

const Notification = ({ notification }) => {
  return (
    <div>
      <Typography variant="body1">{notification.notificationUserName}</Typography>
      <Typography variant="body2">{notification.notification}</Typography>
      <Divider />
    </div>
  );
};

const NotificationsPage = () => {
  const notifications = useSelector((state) => state.user.notifications);

  return (
    <>
      <Navbar />
      <div>
      <Typography 
              fontWeight="500" 
              variant="h1"
              textAlign="center"
              sx={{ mb: "1.5rem"}} 
              fontSize="clamp(1rem, 1.75rem, 2.25rem)"
              color="secondary">
              Notifications
            </Typography>
      <FlexBetween >
      <div>
      {notifications.map((review, index) => (
        <div className="review-container" key={index}>
          <div className="profile-pic"></div>
          <div className="review-details">
            <p className="reviewer-name">{review.notificationUserName}</p>
            <p className="review-text">{review.notification}</p>
          </div>
        </div>
      ))}
    </div>
      </FlexBetween>
      </div>
      <Footer />

      
    </>
  );
};

Notification.propTypes = {
  notification: PropTypes.object.isRequired
}

export default NotificationsPage;