
const mongoose = require('mongoose');

const waypoints = mongoose.Schema({
    latitude: String,
    longitude: String,
  });

const itinerarySchema = mongoose.Schema({
    itineraryImg: String,
	itineraryName: String,
    membersNumber: Number,
    time: Number,
    date: Date,
    
    members: [String],
    supervisor: String,
    disciplines: [String],
    departure: {latitude: String, longitude: String},
    waypoints: [waypoints],
    waypointsName: [String],
    arrival: {latitude: String, longitude: String}
});

const Itinerary = mongoose.model('itineraries', itinerarySchema);

module.exports = Itinerary;