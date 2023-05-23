var express = require("express");
var router = express.Router();

const User = require("../models/user");
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

/* POST SIGN UP*/

router.post("/signup", async (req, res) => {
  if (
    !checkBody(req.body, [
      "firstname",
      "lastname",
      "username",
      "email",
      "password",
      "phoneNumber",
      "dateOfBirth",
      "adresse",
    ])
  ) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  console.log("req.body", req.body);

  const {
    firstname,
    lastname,
    username,
    email,
    password,
    phoneNumber,
    dateOfBirth,
    adresse,
    socialSecurityNumber,
    weight,
    height,
    smoker,
    bloodType,
    allergies,
    treatment,
    medicalHistory,
    advanceDirectives,
    trustedPerson,
    bookmarks,
    itineraries,
    favoriteBra,
  } = req.body;

  const findUserByUsername = await User.findOne({ username: username });
  const findUserByEmail = await User.findOne({ email: email });
  if (findUserByUsername) {
    res.json({ result: false, error: "Username already used" });
    return;
  } else if (findUserByEmail) {
    res.json({ result: false, error: "Email already used" });
    return;
  } else {
    const token = uid2(32);
    const hash = bcrypt.hashSync(password, 10);
    User.create({
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: hash,
      token: token,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
      adresse: adresse,
      socialSecurityNumber: socialSecurityNumber,
      weight: weight,
      height: height,
      smoker: smoker,
      bloodType: bloodType,
      allergies: allergies,
      treatment: treatment,
      medicalHistory: medicalHistory,
      advanceDirectives: advanceDirectives,
      trustedPerson: trustedPerson,
      bookmarks: bookmarks,
      itineraries: itineraries,
      favoriteBra: favoriteBra,
    });
    res.json({
      result: true,
      message: "User succesfully created",
      token: token,
    });
    return;
  }
});

/* POST SIGN IN */

router.post("/signin", async (req, res) => {
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  const { username, password } = req.body;

  const findUser = await User.findOne({
    username: username,
  });

  if (findUser && bcrypt.compareSync(password, findUser.password)) {
    res.json({
      result: true,
      message: "Login successful",
      token: findUser.token,
    });
  } else {
    res.json({ result: false, error: "Wrong password or username" });
  }
});

/* POST UPDATE INFO */

router.post("/update", async (req, res) => {
  const {
    firstname,
    lastname,
    username,
    email,
    token,
    phoneNumber,
    dateOfBirth,
    adresse,
    socialSecurityNumber,
    weight,
    height,
    smoker,
    bloodType,
    drugUse,
    allergies,
    treatment,
    medicalHistory,
    advanceDirectives,
    trustedPerson,
    favoriteBra,
  } = req.body;
  console.log("req.body", req.body);

  const updateUser = await User.updateOne(
    { token: token },
    {
      firstname,
      lastname,
      username,
      email,
      phoneNumber,
      dateOfBirth,
      adresse,
      socialSecurityNumber,
      weight,
      height,
      smoker,
      drugUse,
      bloodType,
      allergies,
      treatment,
      medicalHistory,
      advanceDirectives,
      trustedPerson,
      favoriteBra,
    });
  if (updateUser.modifiedCount === 0) {
    res.json({
      result: false,
      message: "Nothing updated",
    }) } else if (updateUser.modifiedCount > 0) {
      res.json({
        result: true,
        message: "User updated",
      });
    return;
  }
});

router.get('/:token', (req, res) => {
  const token = req.params.token
  User.find({token}).then(data => {
    if(data) {
      res.json({result: true, user: data })
    } else {
      res.json({ result: false, error: 'user not found or problem in backend'})
    }
  })
})

// {
//   medicalHistory: {
//     cardiacCase: false,
//     pulmonaryCase: false,
//     bloodHistory: false,
//     neurologicalCase: false,
//     info: null
//   },
//   trustedPerson: { firstname: null, lastname: null, phoneNumber: null }, 
//   _id: new ObjectId("64663763d387cd7041b73796"),
//   firstname: 'Isisb',
//   lastname: 'Jauge',
//   username: 'onb',
//   email: 'jdisb',
//   password: '$2b$10$uLs5rMkFI6S7TnjE7PAVke3r23nYOnhbIHwmQJydLvtTBO0BkuB2G',
//   token: 'o8Z4q7zKRobH7VJ-AxxJsqxjtL5fqmAK',
//   phoneNumber: 54318,
//   dateOfBirth: '2023-01-01',
//   adresse: 'Naive',
//   socialSecurityNumber: null,
//   weight: null,
//   height: null,
//   bloodType: null,
//   smoker: false,
//   advanceDirectives: false,
//   bookmarks: [],
//   itineraries: [],
//   __v: 0
// }
module.exports = router;
