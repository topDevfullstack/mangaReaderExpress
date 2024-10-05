const express = require('express');
const router = express.Router();
const mangaController = require('../controllers/mangaController');

router.get('/', mangaController.getFindMangas.bind(mangaController));
router.get('/chapter/:mangaId', mangaController.getFindChaptersByMangaId.bind(mangaController));

module.exports = router;