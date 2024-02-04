import { useState, useEffect, React } from 'react';
import './TimerCss.css'
import PropTypes from 'prop-types';

TimerWidget.propTypes = {
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
    
    return(
        <div>
            <div className="countdown-timer">
            <h4>{days}</h4>
            <h4>D- </h4>
            <h4 className="two-numbers">{hours}</h4>
            <h4>H- </h4>
            <h4 className="two-numbers">{minutes}</h4>
            <h4>M- </h4>
            <h4 className="two-numbers">{seconds}</h4>
            <h4>S</h4>
            </div>
        </div>
    )
}
export default function TimerWidget({expiryDate}) {

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
            <p>{remainingTime}</p>
        </div>
    );
  
}