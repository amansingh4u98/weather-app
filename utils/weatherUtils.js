// Method to convert Kelvin temparature to Celsius
function kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
  }

// Method to process the weather data and setting the values of dates, high temperature and low temperature
  function processWeatherData(weatherData) {
    const uniqueDates = {};
  
    for (const forecast of weatherData.list) {
      const date = new Date(forecast.dt * 1000).toISOString().split('T')[0];
  
      if (!uniqueDates[date]) {
        uniqueDates[date] = {
          date: date,
          highTemperature: kelvinToCelsius(forecast.main.temp_max),
          lowTemperature: kelvinToCelsius(forecast.main.temp_min),
          conditions: getConditions(forecast),
        };
      } else {
        if (kelvinToCelsius(forecast.main.temp_max) > uniqueDates[date].highTemperature) {
          uniqueDates[date].highTemperature = kelvinToCelsius(forecast.main.temp_max);
        }
  
        if (kelvinToCelsius(forecast.main.temp_min) < uniqueDates[date].lowTemperature) {
          uniqueDates[date].lowTemperature = kelvinToCelsius(forecast.main.temp_min);
        }
      }
    }
  
    return Object.values(uniqueDates);
  }

// Method to get the conditions in a list along with their time window
  function getConditions(forecast) {
    const conditions = [];
    const timeWindow = new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: '2-digit'});
  
    if (kelvinToCelsius(forecast.main.temp) > 40) {
      conditions.push(`Use sunscreen lotion around ${timeWindow}`);
    }
  
    if (forecast.rain && forecast.rain['3h'] > 0) {
      conditions.push(`Carry umbrella around ${timeWindow}`);
    }
  
    if (forecast.wind.speed > 10) {
      conditions.push(`It's too windy, watch out! around ${timeWindow}`);
    }
  
    if (forecast.weather[0].description.toLowerCase().includes('thunderstorm')) {
      conditions.push(`Don't step out! A Storm is brewing! around ${timeWindow}`);
    }
  
    return conditions;
  }
  
  module.exports = { kelvinToCelsius, processWeatherData, getConditions };
  