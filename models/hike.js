const mongoose = require('mongoose');

const hikeSchema = mongoose.Schema({
	departure: String,
    arrival: String,
});

const Hike = mongoose.model('hikes', hikeSchema);

module.exports = Hike;