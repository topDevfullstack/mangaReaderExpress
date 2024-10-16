const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Customize your ID field as needed
  manga: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga', required: true },
}, { strict: false }); // Allow for dynamic fields from the MangaDex API

const Chapter = mongoose.model("Chapter", ChapterSchema);

module.exports = Chapter;