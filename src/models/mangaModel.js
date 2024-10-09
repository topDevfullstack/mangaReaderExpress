// models/Manga.js
const mongoose = require('mongoose');

const MangaSchema = new mongoose.Schema({
  id: { type: String, require: true, unique: true },
  type: { type: String },
  title: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date }
});

module.exports = mongoose.model('Manga', MangaSchema);