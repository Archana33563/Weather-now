import React from 'react';

// Function to map weather codes to emoji icons
function getWeatherIcon(code) {
  if ([0].includes(code)) return '☀️';
  if ([1, 2].includes(code)) return '🌤️';
  if ([3].includes(code)) return '☁️';
  if ([45, 48].includes(code)) return '🌫️';
  if ([51, 53, 55].includes(code)) return '🌦️';
  if ([61, 63, 65].includes(code)) return '🌧️';
  if ([66, 67].includes(code)) return '🌨️';
  if ([71, 73, 75, 77].includes(code)) return '❄️';
  if ([80, 81, 82].includes(code)) return '🌧️';
  if ([95, 96, 99].includes(code)) return '⛈️';
  return '🌈';
}

function WeatherCard({ weather }) {
  const icon = getWeatherIcon(weather.weathercode);

  return (
    <div className="weather-card">
      <h2>{weather.city}, {weather.country}</h2>
      <div className="weather-info">
        <span className="weather-icon">{icon}</span>
        <p className="temp">{weather.temperature}°C</p>
      </div>
      <p>💨 Wind: {weather.windspeed} km/h</p>
      <p>🕒 Time: {new Date(weather.time).toLocaleString()}</p>
    </div>
  );
}

export default WeatherCard;
