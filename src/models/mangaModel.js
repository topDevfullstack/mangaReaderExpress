// models/Manga.js
const mongoose = require('mongoose');

// Define the schema
const MangaSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Customize your ID field as needed
}, { strict: false }); // Allow for dynamic fields from the MangaDex API

const Manga = mongoose.model("Manga", MangaSchema);

module.exports = Manga;