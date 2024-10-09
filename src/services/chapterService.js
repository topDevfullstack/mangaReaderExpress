const dotenv = require('dotenv');
const axios = require('axios');
const dbService = require('./dbService');
class ChapterService {
  async insertAllChapters(filter) {
    let res = [];
    // let count = 0;
    const mangas = await dbService.getAllMangas(filter);
    mangas && mangas.map(async (manga, index) => {
      // const chapterRow = await dbService.getAllChapters({ mangaId: manga.id });
      // if (count < 10 && chapterRow && !chapterRow.length) {
        res.push(await this.insertChapters(manga._id, manga.id));
        // count++;
      // }
    });

    // console.log(res);
    return res;
  }

  async insertChapters(objId, mangaId) {
    let res = [];
    const resp = await axios({
      method: 'GET',
      url: `${process.env.MANGADEX_URI}/manga/${mangaId}/feed`
    });
    resp && resp.data.data.map(async (chapter) => {
      // console.log(chapter);
      const chapterData = { id: chapter.id, type: chapter.type, title: chapter.attributes.title, mangaId: objId, createdAt: chapter.attributes.createdAt, updatedAt: chapter.attributes.updatedAt };
      res.push(chapterData);
      const chapterRow = await dbService.getAllChapters({ id: chapterData.id });
      // console.log(chapterRow);
      if (!chapterRow.length) await dbService.insertChapterCollection(chapterData);
    });
    return res;
  }
}

module.exports = new ChapterService();