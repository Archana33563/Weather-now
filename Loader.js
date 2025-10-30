import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Fetching weather data...</p>
    </div>
  );
}

export default Loader;
