import React, { useState, useEffect } from 'react';

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState(25);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!isRunning && timeLeft > 0) {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    const newTime = inputMinutes * 60;
    setTimeLeft(newTime);
  };

  const handleSetTime = () => {
    const newTime = Math.max(1, inputMinutes) * 60;
    setTimeLeft(newTime);
    setIsRunning(false);
  };

  return (
    <div style={{
      fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif',
      textAlign: 'center',
      padding: '40px',
      backgroundColor: '#fff0f5',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ff69b4'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px', textShadow: '2px 2px #ffb6c1' }}>🌸 Cute Timer </h1>
      
      <div style={{
        fontSize: '6rem',
        fontWeight: 'bold',
        margin: '20px 0',
        color: '#ff1493',
        textShadow: '3px 3px #ffc0cb'
      }}>
        {formatTime(timeLeft)}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="number"
          value={inputMinutes}
          onChange={(e) => setInputMinutes(parseInt(e.target.value) || 0)}
          min="1"
          style={{
            padding: '10px',
            fontSize: '1.2rem',
            borderRadius: '20px',
            border: '2px solid #ffb6c1',
            width: '80px',
            textAlign: 'center',
            marginRight: '10px'
          }}
        />
        <button
          onClick={handleSetTime}
          style={{
            padding: '10px 20px',
            fontSize: '1rem',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: '#ffb6c1',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Set Minutes
        </button>
      </div>

      <div style={{ display: 'flex', gap: '15px' }}>
        {!isRunning ? (
          <button
            onClick={handleStart}
            style={{
              padding: '15px 30px',
              fontSize: '1.5rem',
              borderRadius: '50px',
              border: 'none',
              backgroundColor: '#ff69b4',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px #c71585'
            }}
          >
            ▶ Start
          </button>
        ) : (
          <button
            onClick={handlePause}
            style={{
              padding: '15px 30px',
              fontSize: '1.5rem',
              borderRadius: '50px',
              border: 'none',
              backgroundColor: '#ffa07a',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px #cd5c5c'
            }}
          >
            ⏸ Pause
          </button>
        )}
        
        <button
          onClick={handleReset}
          style={{
            padding: '15px 30px',
            fontSize: '1.5rem',
            borderRadius: '50px',
            border: 'none',
            backgroundColor: '#87cefa',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px #4682b4'
          }}
        >
          🔄 Reset
        </button>
      </div>

      {timeLeft === 0 && (
        <div style={{
          marginTop: '30px',
          fontSize: '2rem',
          color: '#ff4500',
          animation: 'bounce 1s infinite'
        }}>
           Time's up! 🎉
        </div>
      )}
    </div>
  );
}

export default App;