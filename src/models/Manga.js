// models/Manga.js
const mongoose = require('mongoose');

const MangaSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, required: true, unique: true },
  title: { type: String, required: true },
});

module.exports = mongoose.model('Manga', MangaSchema);