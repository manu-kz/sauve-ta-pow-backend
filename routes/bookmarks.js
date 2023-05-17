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

// mettre ce token en exemple dans le front pour le mettre dans l'url pour le bac en attendant que tous soit synchro
const tokenTest = 'gnkrjg456gfee4gr4gegrzqf'

// post un article bookmark pour un utilisateur en fonction du token
router.post('/newBookmark/:token', (req, res) => {

  const bookmark = {
  author: 'emi',
  title: 'au tekos',
  description: 'gros tapage de pied',
  url: 'http://big48htesmort.com',
  urlToImage: 'http://imagedemagrossegueuleaperslatawa.com',
  publishedAt: 'jsp',
  content: 'stringstringstring',
  }

  User.updateOne({ token: req.params.token }, 
    {$push: { bookmarks: bookmark }})
    .then(data => {
    if (data) {
      console.log(data)
      res.json({ result: true})
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
  const bookmark = {
    author: 'emi',
    title: 'au tekos',
    description: 'gros tapage de pied',
    url: 'http://big48htesmort.com',
    urlToImage: 'http://imagedemagrossegueuleaperslatawa.com',
    publishedAt: 'jsp',
    content: 'stringstringstring',
    }
  
    User.updateOne({ token: req.params.token }, 
      {$pull: { bookmarks: bookmark }})
      .then(data => {
      if (data) {
        console.log(data)
        res.json({ result: true, delete: 'Document deleted'})
      } else {
        // User already exists in database
        res.json({ result: false, error: 'User already exists' });
      }
    });
  });

  // RETURN ARTICLE EXEMPLE

//   "articles": [
  // {
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
module.exports = router;
