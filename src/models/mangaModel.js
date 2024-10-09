// models/Manga.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const MangaSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true },
  type: { type: String },
  title: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date }
});

module.exports = mongoose.model('Manga', MangaSchema);