var express = require("express");
var router = express.Router();

const parseString = require("xml2js").parseString;

const fetch = require("node-fetch");

const apiKey = process.env.METEO_API_KEY;

// get location key
// on récupère en front les données de géoloc

router.get("/location/:location", (req, res) => {
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
        res.json({ error: "Location not found" });
      }
    });
});

// GET Current conditions according to location key

router.get("/current/:locationKey", (req, res) => {
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
        res.json({ error: "Location not found" });
      }
    });
});

// GET hourly weather according to location key

router.get("/hourly/:locationKey", (req, res) => {
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
        res.json({ error: "Location not found" });
      }
    });
});

// GET daily weather according to location key

router.get("/daily/:locationKey", (req, res) => {
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
        res.json({ error: "Location not found" });
      }
    });
});

// GET total daily BRA
router.get("/bra/", (req, res) => {
  let allBra = [];

  for (let i = 1; i < 24; i++) {
    let numBra = i > 9 ? i : `0${i}`;

    let promise = fetch(
      `http://api.meteofrance.com/files/mountain/bulletins/BRA${numBra}.xml`
    )
      .then((response) => response.text())
      .then((responseText) => {
        return new Promise((resolve, reject) => {
          parseString(responseText, function (err, result) {
            if (err) reject(err);
            else resolve(result);
          });
        });
      })
      .catch((err) => console.log(err));

    allBra.push(promise);
  }

  Promise.all(allBra)
    .then((bra) => res.json({ bra }))
    .catch((err) => res.json({ error: "BRA not found" }));
});

// GET unique BRA pour le dashboard. Récupérer seulement le BRA favoris
router.get("/bra/:massif", (req, res) => {
  const { massif } = req.params;

  let braId = () =>  {
    switch (massif) {
      case "chablais":
        return '01';
      case "aravis":
        return '02';
      case "mont-blanc":
        return '03';
      case "bauges":
        return '04';
      case "beaufortain":
        return '05';
      case "haute-tarentaise":
        return '06';
      case "chartreuse":
        return '07';
      case "belledone":
        return '08';
      case "maurienne":
        return '09';
      case "vanoise":
        return '10';
      case "haute-maurienne":
        return '11';
      case "grandes-rousses":
        return '12';
      case "thabor":
        return '13';
      case "vercors":
        return '14';
      case "oisans":
        return '15';
      case "pelvoux":
        return '16';
      case "queyras":
        return '17';
      case "devoluy":
        return '18';
      case "champsaur":
        return '19';
      case "embrunais-parpaillon":
        return '20';
      case "ubaye":
        return '21';
      case `haut-var/haut-verdon`:
        return '22';
      case "mercantour":
        return '23';

      default:
        return noInfo;
    }
  };


  fetch(`http://api.meteofrance.com/files/mountain/bulletins/BRA${braId()}.xml`)
    .then((response) => response.text())
    .then((responseText) => {
      const xmlData = responseText;
      parseString(xmlData, function (err, result) {
        if (result) {
          res.json({ bra: result });
        } else {
          res.json({ error: "BRA not found" });
        }
      });
    });
});

module.exports = router;
