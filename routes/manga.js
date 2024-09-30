// routes/manga.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
const Manga = require('../models/Manga');

const title = 'Kanojyo to Himitsu to Koimoyou';
const baseUrl = 'https://api.mangadex.org';

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

    console.log(resp.data.data.map(manga => manga.id));

    const mangas = await Manga.find();
    res.json(mangas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;