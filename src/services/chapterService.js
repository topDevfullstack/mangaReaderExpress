const dotenv = require('dotenv');
const axios = require('axios');
const dbService = require('./dbService');
class ChapterService {
  async getFindChapters({ mangaId }) {
    // console.log(mangaId);
    const res = await this.getChapters(mangaId);

    // console.log(res);
    return res;
  }

  async getFindAllChapters(filter) {
    let res = [];
    const mangas = await dbService.getAllMangas(filter);
    mangas && mangas.map(async (manga, index) => {
      let count = 0;
      const chapterRow = await dbService.getAllChapters({ mangaId: manga.id });
      if (count < 10 && chapterRow && !chapterRow.length) {
        res.push(await this.getChapters(manga.id));
        count++;
      }
    });

    // console.log(res);
    return res;
  }

  async getChapters(mangaId) {
    let res = [];

    const resp = await axios({
      method: 'GET',
      url: `${process.env.MANGADEX_URI}/manga/${mangaId}/feed`
    });
    resp && resp.data.data.map(async (chapter) => {
      // console.log(chapter);
      const chapterData = { id: chapter.id, type: chapter.type, title: chapter.attributes.title, mangaId: mangaId, createdAt: chapter.attributes.createdAt, updatedAt: chapter.attributes.updatedAt };
      res.push(chapterData);
      const chapterRow = await dbService.getChapterById(chapterData.id);
      // console.log(chapterRow);
      if (!chapterRow.length) await dbService.insertChapterCollection(chapterData);
    });

    return res;
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = new ChapterService();