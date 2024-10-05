const dotenv = require('dotenv');
const axios = require('axios');
const Manga = require('../models/mangaModel');
class MangaService {
  async getFindMangas(filter) {
    const { title } = filter;
    const resp = await axios({
      method: 'GET',
      url: `${process.env.MANGADEX_URI}/manga`,
      params: {
        title: title
      }
    });
    let res = [];
    resp && resp.data.data.map(async(manga)=> {
      // console.log(manga);
      const mangaData = { id: manga.id, type: manga.type, title: manga.attributes.title.en, createdAt: manga.attributes.createdAt, updatedAt: manga.attributes.updatedAt };
      // console.log(mangaData);
      res.push(mangaData);
      const mangaRow = await this.getMangaById(mangaData.id);
      // console.log(mangaRow);
      if (!mangaRow.length) this.insertMangaCollection(mangaData);
    });

    // console.log(res);
    return res;
  }

  async insertMangaCollection(data) {
    const manga = new Manga(data);
    return manga.save();
  }

  async getAllMangas(filter) {
    return Manga.find(filter);
  }

  async getMangaById(mangaId) {
    return Manga.find({ id: mangaId });
  }

  async updateManga(mangaId, mangaData) {
    return Manga.findByIdAndUpdate(mangaId, mangaData, { new: true });
  }

  async deleteManga(mangaId) {
    return Manga.findByIdAndDelete(mangaId);
  }
}

module.exports = new MangaService();