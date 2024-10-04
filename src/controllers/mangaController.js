const mangaService = require('../services/mangaService');

class MangaController {
  async getFilterMangas(req, res) {
    try {
      // console.log(req.query);
      const mangas = await mangaService.getFilterMangas(req.query);
      res.status(200).json(mangas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new MangaController();