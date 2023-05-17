var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');

const apiKey = process.env.METEO_API_KEY;


// get location key  
// on récupère en front les données de géoloc

router.get('/location/:location', (req, res) => {
    const location = req.params.location
  fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${location}&language=fr-fr&details=true&toplevel=true`)
    .then(response => response.json())
    .then(data => {
      if (data) {
        // return données de localisation, dont la location key dont on a besoin pour fetch la météo
        res.json({ location: data });
      } else {
        res.json({ error: 'Location not found' });
      }
    });
});

// RETURN EXEMPLE

// {
//     "location": {
//       "Version": 1,
//       "Key": "2539208",
//       "Type": "City",
//       "Rank": 85,
//       "LocalizedName": "Courmayeur",
//       "EnglishName": "Courmayeur",
//       "PrimaryPostalCode": "",
//       "Region": {
//         "ID": "EUR",
//         "LocalizedName": "Europe",
//         "EnglishName": "Europe"
//       },
//       "Country": {
//         "ID": "IT",
//         "LocalizedName": "Italy",
//         "EnglishName": "Italy"
//       },
//       "AdministrativeArea": {
//         "ID": "23",
//         "LocalizedName": "Aosta Valley",
//         "EnglishName": "Aosta Valley",
//         "Level": 1,
//         "LocalizedType": "Autonomous Region",
//         "EnglishType": "Autonomous Region",
//         "CountryID": "IT"
//       },
//       "TimeZone": {
//         "Code": "CEST",
//         "Name": "Europe/Rome",
//         "GmtOffset": 2,
//         "IsDaylightSaving": true,
//         "NextOffsetChange": "2023-10-29T01:00:00Z"
//       },
//       "GeoPosition": {
//         "Latitude": 45.797,
//         "Longitude": 6.969,
//         "Elevation": {
//           "Metric": {
//             "Value": 1255,
//             "Unit": "m",
//             "UnitType": 5
//           },
//           "Imperial": {
//             "Value": 4116,
//             "Unit": "ft",
//             "UnitType": 0
//           }
//         }
//       },
//       "IsAlias": false,
//       "SupplementalAdminAreas": [
//         {
//           "Level": 3,
//           "LocalizedName": "Courmayeur",
//           "EnglishName": "Courmayeur"
//         }
//       ],
//       "DataSets": [
//         "AirQualityCurrentConditions",
//         "AirQualityForecasts",
//         "Alerts",
//         "DailyPollenForecast",
//         "ForecastConfidence",
//         "FutureRadar",
//         "MinuteCast",
//         "Radar"
//       ]
//     }
//   }

// GET Current conditions according to location key

router.get('/:locationKey', (req, res) => {
    const locationKey = req.params.locationKey

    fetch(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
            console.log('data', data)
          // return données de meteo du moment
          res.json({ meteo: data });
        } else {
          res.json({ error: 'Location not found' });
        }
      });
  });

  // RETURN EXEMPLE

//   {
//     "meteo": [
//       {
//         "LocalObservationDateTime": "2023-05-17T11:47:00+02:00",
//         "EpochTime": 1684316820,
//         "WeatherText": "Partly sunny",
//         "WeatherIcon": 3,
//         "HasPrecipitation": false,
//         "PrecipitationType": null,
//         "IsDayTime": true,
//         "Temperature": {
//           "Metric": {
//             "Value": 8.3,
//             "Unit": "C",
//             "UnitType": 17
//           },
//           "Imperial": {
//             "Value": 47,
//             "Unit": "F",
//             "UnitType": 18
//           }
//         },
//         "MobileLink": "http://www.accuweather.com/en/it/courmayeur/2539208/current-weather/2539208?lang=en-us",
//         "Link": "http://www.accuweather.com/en/it/courmayeur/2539208/current-weather/2539208?lang=en-us"
//       }
//     ]
//   }

module.exports = router;