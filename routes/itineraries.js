var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');
const Itinerary = require('../models/itinerary');
const User = require("../models/user");
const { checkBody } = require('../modules/checkBody');
const apiKey = process.env.MAP_API_KEY;;



/* POST new Itinerary */
router.post('/newItinerary', async (req, res) => {

  // const encadrant = await User.findOne({ username: encadrantName })
  // const encadrantID = encadrant._id
  // console.log('encadrant _id :', encadrantID);

  // trouver les participant dans la db si ils existe afin de raccrocher la clé étrangère a leur doc user 
  // const participant = await findOne({ username: participantName  })
  // const participantID = participant._id
  // console.log('encadrant _id :', encadrantID);

  const {
    itineraryImg,
    itineraryName,
    membersNumber,
    time,
    date,
    members,
    supervisor,
    disciplines,
    departure,
    waypoints,
    waypointsName,
    arrival
  } = req.body

  console.log('data back post itinerary ==> ',    
    itineraryImg,
    itineraryName,
    membersNumber,
    time,
    date,
    members,
    supervisor,
    disciplines,
    departure,
    waypoints,
    waypointsName,
    arrival)
    
  const newItinerary = await Itinerary.create({
    itineraryImg: itineraryImg,
    itineraryName: itineraryName,
    membersNumber: membersNumber,
    time: time,
    date: date,
    member: members,
    supervisor: supervisor,
    disciplines: disciplines,
    departure: departure,
    waypoints: waypoints,
    waypointsName: waypointsName,
    arrival: arrival,
  })
    res.json({ result: true, itinerary: newItinerary });
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