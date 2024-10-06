const express = require('express');
const router = express.Router();
const mangaController = require('../controllers/mangaController');

router.get('/', mangaController.getFindMangas.bind(mangaController));
router.get('/chapters', mangaController.getFindAllChapters.bind(mangaController));
router.get('/chapter/:mangaId', mangaController.getFindChaptersByMangaId.bind(mangaController));
router.get('/chapters/down', mangaController.getFindAllDown.bind(mangaController));
router.get('/down/:chapterId', mangaController.getFindDownByChapterId.bind(mangaController));

module.exports = router;