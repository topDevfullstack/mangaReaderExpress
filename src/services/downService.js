const dotenv = require('dotenv');
const axios = require('axios');
const Down = require('../models/downModel');
class DownService {
  async getFindDowns({ chapterId }) {
    // console.log(chapterId);
    const resp = await axios({
      method: 'GET',
      url: `${process.env.MANGADEX_URI}/at-home/server/${chapterId}`
    });
    let res = [];
    // console.log(resp.data);
    const down = resp.data;
      // console.log(down);
      const downData = { id: down.id, data: down.chapter.data, dataSaver: down.chapter.dataSaver, chapterId: chapterId };
      res.push(downData);
      const downRow = await this.getDownByChapterId(chapterId);
      // console.log(downRow);
      if (!downRow.length) this.insertDownCollection(downData);

    // console.log(res);
    return res;
  }

  async insertDownCollection(data) {
    const down = new Down(data);
    return down.save();
  }

  async getAllDowns(filter) {
    return Down.find(filter);
  }

  async getDownByChapterId(chapterId) {
    return Down.find({ chapterId: chapterId });
  }

  async updateDown(chapterId, chapterData) {
    return Chapter.findByIdAndUpdate(chapterId, chapterData, { new: true });
  }

  async deleteDown(chapterId) {
    return Chapter.findByIdAndDelete(chapterId);
  }
}

module.exports = new DownService();