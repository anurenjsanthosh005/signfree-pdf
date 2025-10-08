import React, { useEffect, useState } from "react";

type TimerProps = {
  initialSeconds: number; // starting time in seconds
  onFinish?: () => void;  // optional callback when timer ends
};

const Timer = ({ initialSeconds, onFinish }: TimerProps) => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      onFinish && onFinish();
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onFinish]);

  return (
    <div className="flex justify-center items-center text-lg sm:text-xl font-semibold text-center text-white">
        <i className="fa-solid fa-hourglass-end"></i>
      {seconds}s remaining
    </div>
  );
};

export default Timer;
