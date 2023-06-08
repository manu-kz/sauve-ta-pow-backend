var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');
const User = require("../models/user");

// scéma bookmark => 
// const bookmarks = mongoose.Schema({
  // {
  //   author: bookmarks.author,
  //   title: bookmarks.title,
  //   description: bookmarks.description,
  //   url: bookmarks.url,
  //   urlToImage: bookmarks.urlToImage,
  //   publishedAt: bookmarks.publishedAt,
  //   content: bookmarks.content,
  // }

// post un article bookmark pour un utilisateur en fonction du token
router.post('/newBookmark/:token', (req, res) => {

  const bookmark = req.body
  console.log(bookmark)

  User.updateOne({ token: req.params.token }, 
    {$push: { bookmarks: bookmark }})
    .then(data => {
    if (data) {
      res.json({ result: true, bookmark: bookmark })
    } else {
      // User already exists in database
      res.json({ result: false, error: 'Document not push in bookmarks' });
    }
  });
  });

// get les articles bookmarks d'un utilisateur en fonction du token
router.get('/bookmarks/:token', (req, res) => {
  const token = req.params.token
  User.findOne({token}).then(data => {
    if(data) {
      res.json({result: true, bookmarks: data.bookmarks})
    } else {
      res.json({ result: false, error: 'user not found or problem in backend'})
    }
  })
});

// delete un article bookmark en fonction du token 
router.delete('/deleteBookmark/:token', (req, res) => {
  // variable avec les infos reçu du front de l'article que l'ont veut bookmark
  const bookmark = req.body
  console.log('req.body ==>',req.body)
  
    User.updateOne({ token: req.params.token }, 
      {$pull: { bookmarks: { title: bookmark.title }}})
      .then(data => {
      if (data) {
        console.log(data)
        res.json({ result: true, bookmark: bookmark})
      } else {
        // User already exists in database
        res.json({ result: false, error: 'Delete did not work' });
      }
    });
  });
  
module.exports = router;
