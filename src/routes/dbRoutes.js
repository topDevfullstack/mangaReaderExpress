const express = require('express');
const router = express.Router();
const dbController = require('../controllers/dbController');

router.get('/list', dbController.getFindChaptersList.bind(dbController));

router.get('/tags/:lastly', dbController.gettagList.bind(dbController));

module.exports = router;