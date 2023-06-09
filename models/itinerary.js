
const mongoose = require('mongoose');

const waypoints = mongoose.Schema({
    latitude: String,
    longitude: String,
  });

const itinerarySchema = mongoose.Schema({
    itineraryImg: {
        type: String,
        default: null
      },
	  itineraryName: String,
    membersNumber: String,
    time: String,
    date: Date,

    members: Array,
    supervisor: String,
    disciplines: String,
    departure: {latitude: String, longitude: String},
    departureName: String,
    waypoints: [waypoints],
    waypointsName: Array,
    arrival: {latitude: String, longitude: String},
    arrivalName: String, 
});

const Itinerary = mongoose.model('itineraries', itinerarySchema);

module.exports = Itinerary;