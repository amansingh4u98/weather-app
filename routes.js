const express = require('express');
const router = express.Router();
const { getWeatherData } = require('./controllers/weatherController');

router.get('/weather/:city', async (req, res) => {
  try {
    const weatherData = await getWeatherData(req.params.city);
    res.json(weatherData);
  } catch (error) {
    console.error('Error during request:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
