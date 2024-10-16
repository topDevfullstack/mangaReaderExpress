// models/Manga.js
const mongoose = require('mongoose');

const MangaSchema = new mongoose.Schema({
  id: String,
  type: String,
  attributes: {
    type: Map,
    of: String
  },
  relationships: [{
    id: String,
    type: String,
    // Add other fields based on your need
  }],
});

module.exports = mongoose.model('Manga', MangaSchema);