var express = require('express');
var router = express.Router();

const parseString = require('xml2js').parseString;

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

router.get('/current/:locationKey', (req, res) => {
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

// GET hourly weather according to location key

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

// GET daily weather according to location key

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

// GET total daily BRA 
router.get('/bra/', (req, res) => {

  let allBra = []

  for (let i=1; i<24; i++){
    let numBra = i > 9 ? i : `0${i}`;

  let promise = fetch(`http://api.meteofrance.com/files/mountain/bulletins/BRA${numBra}.xml`)
  .then(response => response.text())
  .then(responseText => {
      return new Promise((resolve, reject) => {
        parseString(responseText, function(err, result) {
          if (err) reject(err);
          else resolve(result);
        });
      });
    })
    .catch((err) => console.log(err));

    allBra.push(promise);
  }

  Promise.all(allBra)
    .then(bra => res.json({ bra }))
    .catch((err) => res.json({ error: 'BRA not found' }));
});


// GET unique BRA
router.get('/bra/chablais', (req, res) => {

  fetch(`http://api.meteofrance.com/files/mountain/bulletins/BRA01.xml`)
  .then(response => response.text())
  .then(responseText => {
const xmlData = responseText
parseString(xmlData, function(err, result){
  if (result) {
    res.json({ bra : result});
  } else {
    res.json({ error: 'BRA not found' });
  }
})
   });
});

module.exports = router;
