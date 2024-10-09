const mangaService = require('../services/mangaService');
const chapterService = require('../services/chapterService');
const downService = require('../services/downService');
class MangaController {
  async insertMangas(req, res) {
    try {
      // console.log(req.query);
      const mangas = await mangaService.insertMangas(req.query);
      res.status(200).json(mangas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async insertAllChapters(req, res) {
    try {
      const chapters = await chapterService.insertAllChapters(req.query);
      res.status(200).json(chapters);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async insertTenDown(req, res) {
    try {
      // console.log(req.params);
      const downs = await downService.insertTenDowns(req.query);
      res.status(200).json(downs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new MangaController();