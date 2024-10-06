const dotenv = require('dotenv');
const axios = require('axios');
const dbService = require('./dbService');
class MangaService {
  async getFindMangas(filter) {
    // console.log(filter);
    let res = [];
    const resp = await axios({
      method: 'GET',
      url: `${process.env.MANGADEX_URI}/manga`,
      params: filter
    });
    resp && resp.data.data.map(async(manga)=> {
      // console.log(manga);
      const mangaData = { id: manga.id, type: manga.type, title: manga.attributes.title.en, createdAt: manga.attributes.createdAt, updatedAt: manga.attributes.updatedAt };
      // console.log(mangaData);
      res.push(mangaData);
      const mangaRow = await dbService.getMangaById(mangaData.id);
      // console.log(mangaRow);
      if (!mangaRow.length) dbService.insertMangaCollection(mangaData);
    });

    // console.log(res);
    return res;
  }
}

module.exports = new MangaService();