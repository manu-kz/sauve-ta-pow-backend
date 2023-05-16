var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');

// const apiKey = process.env.NEWS_API_KEY;

// lien du fetch du FRONT pour ALL ARTICLES
// https://newsapi.org/v2/everything?q=alpinisme&apiKey=45c6a2cc27d4419faecc40b34ccdfc6d

// post un article bookmark
router.post('/newBookmark', (req, res) => {
    fetch(`http://localhost:3000/`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          res.json({ articles: data.articles });
        } else {
          res.json({ articles: [] });
        }
      });
  });

// get les articles bookmarks 
router.get('/bookmarks:', (req, res) => {
  fetch(`https://newsapi.org/v2/top-headlines?sources=the-verge&apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'ok') {
        res.json({ articles: data.articles });
      } else {
        res.json({ articles: [] });
      }
    });
});

// delete un article bookmark
router.get('/deleteBookmark', (req, res) => {
    fetch(`https://newsapi.org/v2/top-headlines?sources=the-verge&apiKey=${apiKey}`)
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
