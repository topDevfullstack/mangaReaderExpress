const express = require('express');
const router = express.Router();
const mangaController = require('../controllers/mangaController');

router.get('/', mangaController.insertMangas.bind(mangaController));
router.get('/chapters', mangaController.insertAllChapters.bind(mangaController));
router.get('/chapters/down', mangaController.insertTenDown.bind(mangaController));

module.exports = router;