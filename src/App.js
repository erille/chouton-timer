import React, { useState } from 'react';
import TimerSetup from './components/TimerSetup';
import TimerDisplay from './components/TimerDisplay';
import './styles/Timer.css';

function App() {
  console.log('App is rendering'); // Debug log

  const [isRunning, setIsRunning] = useState(false);
  const [timerConfig, setTimerConfig] = useState({
    workDuration: 0,
    breakDuration: 0,
    totalTime: 0,
    workSound: 'beep',
    breakSound: 'ding'
  });

  const handleStart = (config) => {
    setTimerConfig(config);
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
  };

  return (
    <div className="app">
      {!isRunning ? (
        <TimerSetup onStart={handleStart} />
      ) : (
        <TimerDisplay 
          config={timerConfig} 
          onReset={handleReset}
        />
      )}
    </div>
  );
}

export default App; 