const dotenv = require('dotenv');
const axios = require('axios');
const dbService = require('./dbService');
class ChapterService {
  async getFindChapters({ mangaId }) {
    const resp = await axios({
      method: 'GET',
      url: `${process.env.MANGADEX_URI}/manga/${mangaId}/feed`
    });
    let res = [];
    resp && resp.data.data.map(async(chapter)=> {
      // console.log(chapter);
      const chapterData = { id: chapter.id, type: chapter.type, title: chapter.attributes.title, mangaId: mangaId, createdAt: chapter.attributes.createdAt, updatedAt: chapter.attributes.updatedAt };
      res.push(chapterData);
      const chapterRow = await dbService.getChapterById(chapterData.id);
      // console.log(chapterRow);
      if (!chapterRow.length) dbService.insertChapterCollection(chapterData);
    });

    // console.log(res);
    return res;
  }
}

module.exports = new ChapterService();