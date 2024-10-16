// models/Manga.js
const mongoose = require('mongoose');

const DownSchema = new mongoose.Schema({
  baseUrl: { type: String },
  hash: { type: String },
  data: [{ type: String }],
  dataSaver: [{ type: String }],
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
});

const Download = mongoose.model("Download", DownSchema);

module.exports = Download;