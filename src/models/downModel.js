// models/Manga.js
const mongoose = require('mongoose');

const DownSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Customize your ID field as needed
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
}, { strict: false }); // Allow for dynamic fields from the MangaDex API

const Download = mongoose.model("Download", DownSchema);

module.exports = Download;