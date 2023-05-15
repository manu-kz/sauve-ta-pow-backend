var express = require('express');
var router = express.Router();

const User = require('../models/user');
const { checkBody } = require('../modules/checkBody');

/* POST new user */
router.post('/', (req, res) => {
  if (!checkBody(req.body, ['firstname', 'lastname'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  const { firstname, lastname } = req.body;
  const newUser = new User({ firstname, lastname });

  newUser.save().then(() => {
    res.json({ result: true });
  });
});

module.exports = router;
