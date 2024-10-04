// routes/manga.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
const Manga = require('../models/Manga');

const title = 'Kanojyo to Himitsu to Koimoyou';
const baseUrl = 'https://api.mangadex.org';

let chaptersAll = [];

// Get all Mangas
router.get('/', async (req, res) => {
  try {
    // console.log('manga route');

    const resp = await axios({
      method: 'GET',
      url: `${baseUrl}/manga`,
      params: {
        title: title
      }
    });

    resp.data.data.map(async(manga )=> {
      console.log(manga.id);
      const obj = { mangaId: manga.id, chapters: [] };
    });

    const mangas = await Manga.find();
    res.json(chaptersAll);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;