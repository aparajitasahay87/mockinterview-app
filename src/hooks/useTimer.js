// src/hooks/useTimer.js
// src/hooks/useTimer.js
import { useState, useEffect } from "react";

const useTimer = (isInterviewComplete, shouldReset) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (shouldReset) {
      setTime(0); // reset timer
    }
  }, [shouldReset]);

  useEffect(() => {
    let interval;
    if (!isInterviewComplete) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isInterviewComplete]);

  return time;
};

export default useTimer;
