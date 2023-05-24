
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
    time: Number,
    date: Date,

    members: Array,
    supervisor: String,
    disciplines: String,
    departure: {latitude: String, longitude: String},
    waypoints: [waypoints],
    waypointsName: Array,
    arrival: {latitude: String, longitude: String}
});

const Itinerary = mongoose.model('itineraries', itinerarySchema);

module.exports = Itinerary;