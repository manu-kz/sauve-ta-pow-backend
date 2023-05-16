
const mongoose = require('mongoose');

const itinerarySchema = mongoose.Schema({
	departure: String,
    arrival: String,
});

const Itinerary = mongoose.model('itineraries', itinerarySchema);

module.exports = Itinerary;