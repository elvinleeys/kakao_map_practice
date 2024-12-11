import React, { useState } from 'react';
import './App.css';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import useRecordWithDecibel from './hook/useRecordWithDecibel';
import { NavLink } from 'react-router-dom';

Chart.register(...registerables); // Register Time plugin

function App() {
  const { startMeasuringDecibel, stopMeasuringDecibel, decibel } = useRecordWithDecibel();
  const [isRecording, setIsRecording] = useState(false);
  const [dataPoints, setDataPoints] = useState<{ x: string, y: number }[]>([]); // Change to store time and decibel

  const handleToggleRecording = () => {
    if (isRecording) {
      stopMeasuringDecibel();
    } else {
      startMeasuringDecibel();
    }
    setIsRecording(!isRecording);
  };

  // Update chart data with timestamp
  React.useEffect(() => {
    if (isRecording) {
      const timestamp = new Date().toISOString(); // Get current time in ISO format
      setDataPoints((prev) => [...prev.slice(-49), { x: timestamp, y: decibel }]); // Keep last 50 data points
    }
  }, [decibel, isRecording]);

  // Chart.js data and options
  const chartData = {
    datasets: [
      {
        label: 'Decibel Level (dB)',
        data: dataPoints,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 100, // Adjust range as needed
        title: {
          display: true,
          text: 'Decibel Level (dB)',
        },
      },
    },
  };

  return (
    <div className="App">
      <h2>Decibel Meter</h2>
      <button onClick={handleToggleRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <NavLink to='/map'>
        <button>
          map으로 이동하기
        </button>
      </NavLink>
      <p>Current Decibel: {decibel.toFixed(2)} dB</p>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default App;
