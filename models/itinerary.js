
const mongoose = require('mongoose');

const itinerarySchema = mongoose.Schema({
    itineraryImg: String,
	itineraryName: String,
    membersNumber: Number,
    date: Date,
    member: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    supervisor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    disciplines: [String],
    departure: {latitude: String, longitude: String},
    waypoints: [{latitude: String, longitude: String}],
    arrival: {latitude: String, longitude: String},
});

const Itinerary = mongoose.model('itineraries', itinerarySchema);

module.exports = Itinerary;