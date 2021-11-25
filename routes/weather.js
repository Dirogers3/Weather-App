const express = require('express');
const router = express.Router();

const weatherController = require('../controllers/weather');

router.get('/', weatherController.getWeather);

router.get('/favorites', weatherController.getFavorites);

router.get('/preferences', weatherController.getPreferences);

module.exports = router;