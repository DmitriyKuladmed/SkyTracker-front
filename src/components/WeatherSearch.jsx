import React, { useState, useEffect } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { getWeather } from '../api/weather';
import { getLatestCities, searchCities } from '../api/cities';
import '../styles/weatherSearch.css';

const WeatherSearch = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [viewedCities, setViewedCities] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchData = async () => {
    if (username && email) {
      try {
          const data = await getLatestCities(username);
          if (data) {
            setViewedCities(data.latest_cities);
          }
      } catch (error) {
        console.error('Error fetching latest cities:', error);
      }
    }
  };

    fetchData();
  }, [username, email]);


  const handleSearch = async () => {
    if (city.trim() === '') {
      return;
    }

    try {
      const weatherData = await getWeather(city, username);
      setWeather(weatherData);
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      setWeather(null);
    }
  };

  const handleCityClick = (selectedCity) => {
    setCity(selectedCity);
    handleSearch();
  };

  const handleInputChange = async (event, value) => {
    setCity(value);
    if (value.length > 2) {
      const suggestions = await searchCities(value);
      console.log(suggestions);
      setCitySuggestions(suggestions);
    } else {
      setCitySuggestions([]);
    }
  };

  return (
    <div className="weather-search-container">
      <div className="search-box">
        <h2 style={{ textAlign: 'center' }}>Поиск погоды по городам</h2>
        <Autocomplete
          freeSolo
          options={citySuggestions}
          inputValue={city}
          onInputChange={handleInputChange}
          renderInput={(params) => (
            <TextField {...params} className="autocomplete-input" placeholder="Введите название города" variant="outlined" fullWidth />
          )}
        />
        <button className="search-button" onClick={handleSearch}>Найти</button>
        <div className="viewed-cities">
          <h4>Последние просмотренные города:</h4>
          <div className="viewed-cities-list">
            {viewedCities.length > 0 ? (
              viewedCities.slice(-5).map((cityName, index) => (
                <div key={index} className="viewed-city" onClick={() => handleCityClick(cityName)}>
                  {cityName}
                </div>
              ))
            ) : (
              <p className="text-center">Вы пока ничего не искали или не авторизованы</p>
            )}
          </div>
        </div>
      </div>
      {weather && (
        <div className="weather-info">
          <h3>Погода в {weather.city}:</h3>
          <p>Температура: {weather.temp}°C</p>
          <p>Скорость ветра: {weather.wind} м/с</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p>{weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}</p>
            <img src={`http://openweathermap.org/img/w/${weather.icon}.png`} alt="Фото погоды" className="img-thumbnail" />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherSearch;
