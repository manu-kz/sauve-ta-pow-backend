var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');

const apiKey = process.env.NEWS_API_KEY;

// lien du fetch du FRONT pour ALL ARTICLES
// https://newsapi.org/v2/everything?q=alpinisme&apiKey=45c6a2cc27d4419faecc40b34ccdfc6d

// get all articles  
router.get('/', (req, res) => {
  fetch(`https://newsapi.org/v2/everything?q=alpinisme&apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'ok') {
        res.json({ articles: data.articles });
      } else {
        res.json({ articles: [] });
      }
    });
});

module.exports = router;