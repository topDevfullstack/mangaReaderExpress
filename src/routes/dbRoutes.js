const express = require('express');
const router = express.Router();
const dbController = require('../controllers/dbController');

router.get('/list', dbController.getFindChaptersList.bind(dbController));

module.exports = router;