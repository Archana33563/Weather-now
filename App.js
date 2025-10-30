import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Loader from './components/Loader';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (cityName) => {
    setCity(cityName);
    setError('');
    setWeather(null);
    setLoading(true);

    try {
      // Step 1: Get coordinates
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
      );
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError('City not found. Please try another city.');
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // Step 2: Get current weather
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherResponse.json();

      setWeather({
        city: name,
        country: country,
        temperature: weatherData.current_weather.temperature,
        windspeed: weatherData.current_weather.windspeed,
        weathercode: weatherData.current_weather.weathercode,
        time: weatherData.current_weather.time,
      });
    } catch (err) {
      setError('Error fetching weather data. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>🌤️ Weather Now</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <p className="error">{error}</p>}
      {weather && !loading && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;
