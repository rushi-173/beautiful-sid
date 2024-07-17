import React, { useState, useEffect, useRef } from "react";

const Counter: React.FC = () => {
  const [counter, setCounter] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCounter((prevCounter: number) => prevCounter + 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleStartPauseClick = () => {
    setIsRunning((prevIsRunning: boolean) => !prevIsRunning);
  };

  const handleResetClick = () => {
    setCounter(0);
    setIsRunning(false);
  };

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={handleStartPauseClick}>
        {isRunning ? "Pause" : "Start"}
      </button>
      <button onClick={handleResetClick}>Reset</button>
    </div>
  );
};

export default Counter;
