var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');
const Itinerary = require('../models/itinerary');
const { checkBody } = require('../modules/checkBody');


/* POST new Itinerary */
router.post('/', (req, res) => {
  if (!checkBody(req.body, ['departure', 'arrival'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  const { departure, arrival } = req.body;
  const newItinerary = new Itinerary({ departure, arrival });

  newItinerary.save().then(() => {
    res.json({ result: true });
  });
});

module.exports = router;