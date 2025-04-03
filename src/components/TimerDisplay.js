import React, { useState, useEffect } from 'react';

function TimerDisplay({ config, onReset }) {
  const [timeLeft, setTimeLeft] = useState(config.workDuration);
  const [totalTimeLeft, setTotalTimeLeft] = useState(config.totalTime * 60);
  const [isWork, setIsWork] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          const sound = new Audio(`/sounds/${isWork ? config.breakSound : config.workSound}.mp3`);
          sound.play();
          setIsWork(!isWork);
          return isWork ? config.breakDuration : config.workDuration;
        }
        return prev - 1;
      });

      setTotalTimeLeft(prev => {
        if (prev <= 1) {
          const finishSound = new Audio('/sounds/finish.mp3');
          finishSound.play();
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, isWork, config]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="timer-display">
      <h1>CHOUTON TIMER</h1>
      
      <div className="timer">
        <div className="time">{formatTime(timeLeft)}</div>
        <div className="status">{isWork ? 'Work Interval' : 'Break Interval'}</div>
        <div className="total-time">Total Time Left: {formatTime(totalTimeLeft)}</div>
      </div>

      <div className="controls">
        <button onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}

export default TimerDisplay;
