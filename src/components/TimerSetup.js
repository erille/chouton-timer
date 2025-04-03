import React, { useState } from 'react';

function TimerSetup({ onStart }) {
  const [workDuration, setWorkDuration] = useState(0);
  const [breakDuration, setBreakDuration] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [workSound, setWorkSound] = useState('beep');
  const [breakSound, setBreakSound] = useState('ding');

  const sounds = ['Beep', 'Meow', 'Bell', 'Ding'];

  const handlePreset1 = () => {
    setWorkDuration(45);
    setBreakDuration(15);
    setTotalTime(15);
  };

  const handlePreset2 = () => {
    setWorkDuration(30);
    setBreakDuration(10);
    setTotalTime(15);
  };

  const playTestSound = (sound) => {
    const audio = new Audio(`/sounds/${sound.toLowerCase()}.mp3`);
    audio.play();
  };

  const handleStart = () => {
    onStart({
      workDuration,
      breakDuration,
      totalTime,
      workSound,
      breakSound
    });
  };

  return (
    <div className="timer-setup">
      <h1>CHOUTON TIMER</h1>
      
      <div className="duration-inputs">
        <div className="input-group">
          <label>Work Duration (s)</label>
          <input
            type="number"
            value={workDuration}
            onChange={(e) => setWorkDuration(Number(e.target.value))}
          />
        </div>
        
        <div className="input-group">
          <label>Break Duration (s)</label>
          <input
            type="number"
            value={breakDuration}
            onChange={(e) => setBreakDuration(Number(e.target.value))}
          />
        </div>
        
        <div className="input-group">
          <label>Total Time (min)</label>
          <input
            type="number"
            value={totalTime}
            onChange={(e) => setTotalTime(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="presets">
        <button onClick={handlePreset1}>45s/15s</button>
        <button onClick={handlePreset2}>30s/10s</button>
      </div>

      <div className="sound-selectors">
        <div className="sound-group">
          <label>Work Interval Sound</label>
          <div className="sound-controls">
            <select 
              value={workSound}
              onChange={(e) => setWorkSound(e.target.value)}
            >
              {sounds.map(sound => (
                <option key={sound} value={sound.toLowerCase()}>{sound}</option>
              ))}
            </select>
            <button onClick={() => playTestSound(workSound)}>Test</button>
          </div>
        </div>

        <div className="sound-group">
          <label>Break Interval Sound</label>
          <div className="sound-controls">
            <select 
              value={breakSound}
              onChange={(e) => setBreakSound(e.target.value)}
            >
              {sounds.map(sound => (
                <option key={sound} value={sound.toLowerCase()}>{sound}</option>
              ))}
            </select>
            <button onClick={() => playTestSound(breakSound)}>Test</button>
          </div>
        </div>
      </div>

      <div className="controls">
        <button className="start-button" onClick={handleStart}>Start</button>
        <button className="reset-button" onClick={() => window.location.reload()}>Reset</button>
      </div>
    </div>
  );
}

export default TimerSetup;
