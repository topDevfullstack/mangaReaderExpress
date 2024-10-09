const dotenv = require('dotenv');
const axios = require('axios');
const dbService = require('./dbService');
class DownService {
  async getFindDowns({ chapterId }) {
    // console.log(chapterId);
    const res = await this.getDowns(chapterId);

    // console.log(res);
    return res;
  }

  async getFindAllDowns(filter) {
    let res = [];
    let count = 0;
    const chapters = await dbService.getAllChapters(filter);
    // console.log(chapters);
    chapters && chapters.map(async (chapter, index) => {
      const downRow = await dbService.getAllDowns({ chapterId: chapter._id });
      // console.log(downRow);
      if (count < 10 && !downRow.length) {
        count++;
        res = await this.getDowns(chapter._id, chapter.id);
      }
    });

    // console.log(res);
    return res;
  }

  async getDowns(objId, chapterId) {
    // console.log(chapterId);
    let res = [];

    const resp = await axios({
      method: 'GET',
      url: `${process.env.MANGADEX_URI}/at-home/server/${chapterId}`
    });
    // console.log(resp.data);
    const down = resp.data;
    const downData = { id: down.id, data: down.chapter.data, dataSaver: down.chapter.dataSaver, chapterId: objId };
    res.push(downData);
    const downRow = await dbService.getDownByChapterId(downData.id);
    // console.log(downRow);
    if (!downRow.length) await dbService.insertDownCollection(downData);

    return res;
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = new DownService();