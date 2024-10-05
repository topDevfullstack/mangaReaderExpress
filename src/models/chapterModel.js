const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String },
  title: { type: String },
  mangaId: { type: mongoose.Schema.Types.UUID, ref: 'Manga', required: true },
  createdAt: { type: Date },
  updatedAt: { type: Date }
});

module.exports = mongoose.model('Chapter', ChapterSchema);