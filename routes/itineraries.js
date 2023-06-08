var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");
const Itinerary = require("../models/itinerary");
const User = require("../models/user");
<<<<<<< HEAD
const { checkBody } = require("../modules/checkBody");
const apiKey = process.env.WHAT_THREE_WORDS;
=======
const apiKey = process.env.MAP_API_KEY;
>>>>>>> 4e275a7e15e25b7ee7250472b8b13b4b1055fa03

/* POST new Itinerary */
router.post("/newItinerary/:token", (req, res) => {
  // trouver les participant dans la db si ils existe afin de raccrocher la clé étrangère a leur doc user
  const token = req.params.token;

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
    departureName,
    waypoints,
    waypointsName,
    arrival,
    arrivalName,
  } = req.body;

  // création d'un nouvel itinéraire
  const newItinerary = new Itinerary({
    itineraryImg: itineraryImg,
    itineraryName: itineraryName,
    membersNumber: membersNumber,
    time: time,
    date: date,
    members: members,
    supervisor: supervisor,
    disciplines: disciplines,
    departure: departure,
    departureName: departureName,
    waypoints: waypoints,
    waypointsName: waypointsName,
    arrival: arrival,
    arrivalName,
    arrivalName,
  });

  // save le nouvel itinéraire dans la collection itineraries
  newItinerary.save().then(() => {
    // find l'itinéraire save précédement
    Itinerary.findOne({ itineraryName }).then((data) => {
      if (data) {
        // récupère l'id de l'itinéraire
        const id = data._id;
        // Update dans le doc du user en fonction du token et insère la clé étrangère (id) dans la clé itineraries du user
        User.updateOne({ token }, { $push: { itineraries: id } }).then(
          (data) => {
            if (data) {
              res.json({ result: true, itinerary: newItinerary });
            } else {
              res.json({ result: false, error: "push did not work" });
            }
          }
        );
      }
    });
  });
});

//Afficher les itinéraires d'un utilisateur 
router.get('/:token', (req, res) => {
  const token = req.params.token
  User.findOne({ token})
  .populate('itineraries')
  .then(data => {
    if(data) {
      res.json({ result: true, itineraries: data.itineraries})
    } else {
      res.json({result: false, error: 'user not found or problem in foreign key'})
    }
  })
})

//RECEVOIR LES 3 MOTS DE LOCALISATION

router.get("/what3words/:longitude/:latitude", async (req, res) => {
  const { longitude, latitude } = req.params;


  const rawRes = await fetch(
    `https://api.what3words.com/v3/convert-to-3wa?key= ${apiKey}&coordinates=${latitude}%2C${longitude}&language=fr&format=json`
  );
  const jsonRes = await rawRes.json();

  res.json({ what3words: jsonRes });
});

module.exports = router;
