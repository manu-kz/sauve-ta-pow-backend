const mongoose = require("mongoose");


const bookmarks = mongoose.Schema({
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: String,
  content: String,
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
  socialSecurityNumber: {
    type: Number,
    default: null
  },
  weight: {
    type: Number,
    default: null
  },
  height: {
    type: Number,
    default: null
  },
  bloodType: {
    type: String,
    default: null
  },
  smoker: {
    type: Boolean,
    default: false
  },
  drugUse: {
    type: String,
    default: null
  },
  allergies: {
    type: String,
    default: null
  },
  treatment: {
    type: String,
    default: null
  },
  medicalHistory: {
    cardiacCase: {
      type: Boolean,
      default: false
    },
    pulmonaryCase: {
      type: Boolean,
      default: false
    },
    bloodHistory: {
      type: Boolean,
      default: false
    },
    neurologicalCase: {
      type: Boolean,
      default: false
    },
    info: {
      type: String,
      default: null
    },
  },
  advanceDirectives: {
    type: Boolean,
    default: false
  },
  trustedPerson: {
    firstname: {
      type: String,
      default: null
    },
    lastname: {
      type: String,
      default: null
    },
    phoneNumber: {
      type: Number,
      default: null
    },
  },

  //App Usage
  bookmarks: [bookmarks],
  itineraries: [{ type: mongoose.Schema.Types.ObjectId, ref: "itineraries" }],
  favoriteBra: {
    type: String,
    default: null
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
