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
        // return nombre d'articles et tous les articles avec le mot clé alpinisme
        // traitement dans le front pour trie du top article
        res.json({ articles: data.articles });
      } else {
        res.json({ error: 'Articles not found' });
      }
    });
});

// RETURN EXEMPLE

//   "articles": [
  // {
  //   "number": 19,
  //   "articles": [
  //     {
  //       "source": {
  //         "id": "lequipe",
  //         "name": "L'equipe"
  //       },
  //       "author": "David Michel",
  //       "title": "Les Français Thibault Anselmet et Emily Harrop vainqueurs de la Coupe du monde de ski-alpinisme",
  //       "description": "Les Français Thibault Anselmet et Emily Harrop ont remporté la Coupe du monde 2023 de ski-alpinisme, ce samedi à Tromso en Norvège.",
  //       "url": "https://www.lequipe.fr/Adrenaline/Ski-alpinisme/Actualites/Les-francais-thibault-anselmet-et-emily-harrop-vainqueurs-de-la-coupe-du-monde-de-ski-alpinisme/1391593",
  //       "urlToImage": "https://medias.lequipe.fr/img-photo-jpg/thibault-anselmet-c-angot-ffme/1500000001773803/237:354,1148:962-640-427-75/01c40.jpg",
  //       "publishedAt": "2023-04-15T15:19:57Z",
  //       "content": "À trois ans des JO de Milan et Cortina d'Ampezzo, la France a signé un magnifique doublé avec les gros globes de cristal de Emily Harrop et Thibault Anselmet. Les deux Tricolores ont fini premiers au… [+1749 chars]"
  //     },

  // Faire route pour une recherche d'articles
  router.get('/:search', (req, res) => {

    // recherche de l'utilisateur dans l'onglet article
    // gerer la casse et les espaces !!
    const search = req.params.search

    fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          // return nombre d'articles et tous les articles avec le mot clé alpinisme
          // traitement dans le front pour trie du top article
          res.json({ number: data.totalResults, articles: data.articles });
        } else {
          res.json({ error: 'Articles not found' });
        }
      });
  });

module.exports = router;