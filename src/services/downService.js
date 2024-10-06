const dotenv = require('dotenv');
const axios = require('axios');
const dbService = require('./dbService');
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
      const downRow = await dbService.getDownByChapterId(chapterId);
      // console.log(downRow);
      if (!downRow.length) dbService.insertDownCollection(downData);

    // console.log(res);
    return res;
  }
}

module.exports = new DownService();