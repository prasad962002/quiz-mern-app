import React, { useEffect, useState } from "react";

const Timer = ({ initialTime, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      //When time runs out
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} m: ${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds} s`;
  };
  return (
    <div className="text-center text-lg font-semibold mb-4">
      Time Left : <span className="text-red-600"> {formatTime(timeLeft)} </span>
    </div>
  );
};

export default Timer;
