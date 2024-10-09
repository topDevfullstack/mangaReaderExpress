const dotenv = require('dotenv');
const axios = require('axios');
const dbService = require('./dbService');
class DownService {
  async insertTenDowns(filter) {
    let res = [];
    let count = 0;

    try {
      const chapters = await dbService.getAllChapters(filter);

      // Create an array of Promises to handle the async operations
      const downPromises = chapters.map(async (chapter) => {
        const downRow = await dbService.getAllDowns({ chapterId: chapter._id });

        if (count < 10 && !downRow.length) {
          count++;
          const downData = await this.insertDowns(chapter._id, chapter.id);
          res.push(...downData); // Add the new down data entries to the res array
        }
      });

      // Wait for all promises to resolve
      await Promise.all(downPromises);

    } catch (error) {
      console.error('Error in insertTenDowns:', error);
    }

    return res; // Return the array of inserted data
  }

  async insertDowns(objId, chapterId) {
    let res = [];

    try {
      const resp = await axios({
        method: 'GET',
        url: `${process.env.MANGADEX_URI}/at-home/server/${chapterId}`
      });

      const down = resp.data;
      const downData = {
        baseUrl: down.baseUrl,
        data: down.chapter.data,
        dataSaver: down.chapter.dataSaver,
        chapterId: objId
      };

      const downRow = await dbService.getAllDowns({ chapterId: downData.chapterId });

      if (!downRow.length) {
        const flag = await dbService.insertDownCollection(downData);
        if (flag) {
          res.push(downData);
        }
      }
    } catch (error) {
      console.error(`Error processing down data for chapter ID ${chapterId}:`, error);
    }

    return res; // This will return the populated array if any data is inserted
  }
}

module.exports = new DownService();