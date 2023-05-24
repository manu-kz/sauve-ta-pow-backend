var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");
const Itinerary = require("../models/itinerary");
const User = require("../models/user");
const { checkBody } = require("../modules/checkBody");
const apiKey = process.env.MAP_API_KEY;

/* POST new Itinerary */
router.post("/newItinerary/:token", (req, res) => {
  // const encadrant = await User.findOne({ username: encadrantName })
  // const encadrantID = encadrant._id
  // console.log('encadrant _id :', encadrantID);

  // trouver les participant dans la db si ils existe afin de raccrocher la clé étrangère a leur doc user
  // const participant = await findOne({ username: participantName  })
  // const participantID = participant._id
  // console.log('encadrant _id :', encadrantID);

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
        console.log("data ID", data._id);
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

// post dans le doc user la clé étrangère de l'itinéraire post précédement
router.post("/newItinerary/:token", (req, res) => {
  const token = req.params.token;
  User.findOne({ token }).then((data) => {});
});

//Afficher les itinéraires d'un utilisateur
router.get("/:token", (req, res) => {
  Itinerary.find().then((data) => {
    res.json({ itinerary: data });
  });
});

//Modifier les informations d'un itinéraire
router.put("/", (req, res) => {});

//Supprimer un itineraire

//RECEVOIR LES 3 MOTS DE LOCALISATION

router.get("/what3words/:longitude/:latitude", async (req, res) => {
  const { longitude, latitude } = req.params;

  const apiKey = "9JKGGCZS";

  const rawRes = await fetch(
    `https://api.what3words.com/v3/convert-to-3wa?key= ${apiKey}&coordinates=${longitude}%2C${latitude}&language=fr&format=json`
  );
  const jsonRes = await rawRes.json();
  console.log("jsonrRes", jsonRes);

  res.json({ what3words: jsonRes });
});

module.exports = router;
