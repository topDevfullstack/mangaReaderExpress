const express = require('express');
const router = express.Router();
const mangaController = require('../controllers/mangaController');

router.get('/', mangaController.getAllUsers.bind(mangaController));

module.exports = router;