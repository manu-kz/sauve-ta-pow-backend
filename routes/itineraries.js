var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');
const Itinerary = require('../models/itinerary');
const User = require("../models/user");
const { checkBody } = require('../modules/checkBody');
const apiKey = process.env.MAP_API_KEY;;



/* POST new Itinerary */
router.post('/', async (req, res) => {
  if (!checkBody(req.body, ['departure', 'arrival', 'itineraryName', 'membersNumber', 'date'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  const encadrant = await User.findOne({ username: encadrantName })
  const encadrantID = encadrant._id
  console.log('encadrant _id :', encadrantID);

  const participant = await findOne({ username: participantName  })
  const participantID = participant._id
  console.log('encadrant _id :', encadrantID);


  const newItinerary = await Itinerary.create({
    itineraryImg: req.body.itineraryImg,
    itineraryName: req.body.itineraryName,
    membersNumber: 2,
    date: req.body.date,
    member: [new ObjectId(participantID)],
    supervisor: [new ObjectId(encadrantID)],
    disciplines: [req.body.disciplines],
    departure: {latitude: String, longitude: String},
    waypoints: [{latitude: String, longitude: String}],
    arrival: {latitude: String, longitude: String},
  })
    res.json({ result: true, itinerary: data });
});

//Afficher les itinéraires d'un utilisateur 
router.get('/', (req, res) => {
  Itinerary.find().then(data => {
		res.json({ itinerary: data });
	});
})

//Modifier les informations d'un itinéraire
router.put('/', (req, res) => {})

//Supprimer un itineraire


module.exports = router;