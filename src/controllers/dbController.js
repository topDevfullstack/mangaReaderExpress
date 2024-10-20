const dbService = require('../services/dbService');
class DbController {
  async getFindChaptersList(req, res) {
    try {
      // console.log(req.query);
      const mangas = await dbService.getFindDownsList(req.query);
      res.status(200).json(mangas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async gettagList(req, res) {
    try {
      const { lastly } = req.params;
      const mangas = await dbService.gettagList(lastly);
      // console.log(mangas);
      res.status(200).json(mangas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new DbController();