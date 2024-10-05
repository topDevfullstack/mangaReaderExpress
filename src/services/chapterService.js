const dotenv = require('dotenv');
const axios = require('axios');
const Chapter = require('../models/chapterModel');
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
      const chapterRow = await this.getChapterById(chapterData.id);
      // console.log(chapterRow);
      if (!chapterRow.length) this.insertChapterCollection(chapterData);
    });

    // console.log(res);
    return res;
  }

  async insertChapterCollection(data) {
    const chapter = new Chapter(data);
    return chapter.save();
  }

  async getAllChapters(filter) {
    return Chapter.find(filter);
  }

  async getChapterById(chapterId) {
    return Chapter.find({ id: chapterId });
  }

  async updateChapter(chapterId, chapterData) {
    return Chapter.findByIdAndUpdate(chapterId, chapterData, { new: true });
  }

  async deleteChapter(chapterId) {
    return Chapter.findByIdAndDelete(chapterId);
  }
}

module.exports = new ChapterService();