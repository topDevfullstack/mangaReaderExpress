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
    const chapters = await dbService.getAllChapters(filter);
    // console.log(chapters);
    chapters && chapters.map(async(chapter, index) => {
      res = await this.getDowns(chapter.id);
    });

    // console.log(res);
    return res;
  }

  async getDowns(chapterId) {
    let res = [];
    const resp = await axios({
      method: 'GET',
      url: `${process.env.MANGADEX_URI}/at-home/server/${chapterId}`
    });
    // console.log(resp.data);
    const down = resp.data;
    const downData = { id: down.id, data: down.chapter.data, dataSaver: down.chapter.dataSaver, chapterId: chapterId };
    res.push(downData);
    const downRow = await dbService.getDownByChapterId(chapterId);
    // console.log(downRow);
    if (!downRow.length) await dbService.insertDownCollection(downData);

    return res;
  }
}

module.exports = new DownService();