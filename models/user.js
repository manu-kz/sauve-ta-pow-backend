const mongoose = require("mongoose");

const medicalHistory = mongoose.Schema({
  cardiacCase: Boolean,
  pulmonaryCase: Boolean,
  bloodHistory: Boolean,
  neurologicalCase: Boolean,
  info: String,
});


const bookmarks = mongoose.Schema({
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: String,
  content: String,
});

const trustedPerson = mongoose.Schema({
  firstname: String,
  lastname: String,
  phoneNumber: Number,
});

const userSchema = mongoose.Schema({
  //User Info

  firstname: String,
  lastname: String,
  username: String,
  email: String,
  password: String,
  token: String,
  phoneNumber: Number,
  dateOfBirth: String,
  adresse: String,

  //Health Info
  socialSecurityNumber: Number,
  weight: Number,
  height: Number,
  bloodType: String,
  smoker: Boolean,
  drugUse: Array,
  allergies: Array,
  treatment: Array,
  medicalHistory: medicalHistory,
  advanceDirectives: Boolean,
  trustedPerson: trustedPerson,

  //App Usage
  bookmarks: bookmarks,
  itineraries: [{ type: mongoose.Schema.Types.ObjectId, ref: "itineraries" }],
});

const User = mongoose.model("users", userSchema);

module.exports = User;
