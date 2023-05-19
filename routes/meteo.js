var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');

const apiKey = process.env.METEO_API_KEY;

// get location key
// on récupère en front les données de géoloc

router.get('/location/:location', (req, res) => {
  const location = req.params.location;
  fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${location}&language=fr-fr&details=true&toplevel=true`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        // return données de localisation, dont la location key dont on a besoin pour fetch la météo
        res.json({ location: data });
      } else {
        res.json({ error: 'Location not found' });
      }
    });
});


// GET Current conditions according to location key

router.get('/:locationKey', (req, res) => {
  const locationKey = req.params.locationKey;

  fetch(
    `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&language=fr-fr`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        // return données de meteo du moment
        res.json({ meteo: data });
      } else {
        res.json({ error: 'Location not found' });
      }
    });
});


// GET hourly according to location key

router.get('/hourly/:locationKey', (req, res) => {
  const locationKey = req.params.locationKey;

  fetch(
 `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=${apiKey}&language=fr-fr&metric=true`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        // return données de meteo du moment
       res.json({ meteo: data });
      } else {
        res.json({ error: 'Location not found' });
      }
    });
});

router.get('/daily/:locationKey', (req, res) => {
  const locationKey = req.params.locationKey;

  fetch(
 `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&language=fr-fr&metric=true`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        // return données de meteo du moment
       res.json({ meteo: data.DailyForecasts });
      } else {
        res.json({ error: 'Location not found' });
      }
    });
});



module.exports = router;
