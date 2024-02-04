import { useState, useEffect, React } from 'react';
import PropTypes from 'prop-types';

SmallTimerWidget.propTypes = {
  expiryDate: PropTypes.string.isRequired,
}


function calculateRemainingTime(endDate) {
    const now = new Date();
    const remainingTime = new Date(endDate) - now;
    if (remainingTime < 0) {
      return "Event has already passed";
    }
    const seconds = Math.floor((remainingTime / 1000) % 60);
    const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    return `${days}D, ${hours}H, ${minutes}M, and ${seconds}s`;
}


export default function SmallTimerWidget({expiryDate}) {

    const endDate = new Date(expiryDate).toUTCString(); 
    const [remainingTime, setRemainingTime] = useState(calculateRemainingTime(endDate));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime(calculateRemainingTime(endDate));
        }, 1000);
    return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <p>Time Left: {remainingTime}</p>
        </div>
    );
  
}