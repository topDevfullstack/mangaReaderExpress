// routes/manga.js
const express = require('express');
const router = express.Router();
const Manga = require('../models/Manga');

// Get all Mangas
router.get('/', async (req, res) => {
  try {
    console.log('manga route');
    const mangas = await Manga.find();
    res.json(mangas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;