require('dotenv').config();
const axios = require('axios');
const { processWeatherData } = require('../utils/weatherUtils');

async function getWeatherData(city) {
  try {
    const apiKey = process.env.API_KEY;
    const url = process.env.API_URL;
    const apiUrl = `${url}/data/2.5/forecast?q=${city}&appid=${apiKey}&cnt=15`;
    const response = await axios.get(apiUrl);
    const weatherData = response.data;
    return processWeatherData(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    throw error; // Re-throw the error for higher-level handling
  }
}

module.exports = { getWeatherData };
