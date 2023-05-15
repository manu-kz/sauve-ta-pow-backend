var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');
const Hike = require('../models/hike');
const { checkBody } = require('../modules/checkBody');


/* POST new hike */
router.post('/', (req, res) => {
  if (!checkBody(req.body, ['departure', 'arrival'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  const { departure, arrival } = req.body;
  const newHike = new Hike({ departure, arrival });

  newHike.save().then(() => {
    res.json({ result: true });
  });
});

module.exports = router;