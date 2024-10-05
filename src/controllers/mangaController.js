const mangaService = require('../services/mangaService');

class MangaController {
  async getFindMangas(req, res) {
    try {
      // console.log(req.query);
      const mangas = await mangaService.getFindMangas(req.query);
      res.status(200).json(mangas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new MangaController();