const Manga = require('../models/mangaModel');

class MangaService {
  async getFilterMangas(data) {
    // console.log(data);
    return Manga.find();
  }
}

module.exports = new MangaService();