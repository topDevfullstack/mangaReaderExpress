// models/Manga.js
const mongoose = require('mongoose');

const DownSchema = new mongoose.Schema({
  baseUrl: { type: String },
  data: [{ type: String }],
  dataSaver: [{ type: String }],
  chapterId: { type: mongoose.Schema.Types.UUID, ref: 'Chapter', required: true },
});

module.exports = mongoose.model('Download', DownSchema);