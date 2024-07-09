import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Weather = () => {
  const [city, setCity] = useState('London'); // Default city to prevent initial empty fetch
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4fd159bd0054ae074f335e3a880c598c`
      );
      setWeatherData(response.data);
      setError(''); // Clear previous errors
      console.log(response.data); // You can see all the weather data in console log
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        setError('City not found');
      } else {
        setError('An error occurred');
      }
      setWeatherData(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Only run on initial mount

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className='container my-5'>
      <div className="card text-center my-5 shadow">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter city name"
                    value={city}
                    onChange={handleInputChange}
                  />
                  <div className="input-group-append">
                    <button className='btn btn-primary mx-2' type="submit">Get Weather</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          {weatherData ? (
            <>
              <h2 className="card-title">{weatherData.name}</h2>
              <p className="card-text">Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p> {/* Convert Kelvin to Celsius */}
              <p className="card-text">Description: {weatherData.weather[0].description}</p>
              <p className="card-text">Feels like: {(weatherData.main.feels_like - 273.15).toFixed(2)}°C</p> {/* Convert Kelvin to Celsius */}
              <p className="card-text">Humidity: {weatherData.main.humidity}%</p>
              <p className="card-text">Pressure: {weatherData.main.pressure} hPa</p>
              <p className="card-text">Wind Speed: {weatherData.wind.speed} m/s</p>
            </>
          ) : (
            !error && <p>Loading weather data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
