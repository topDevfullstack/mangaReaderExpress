const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const mangaRoutes = require('./mangaRoutes');
const dbRoutes = require('./dbRoutes');

router.use('/user', userRoutes);
router.use('/manga', mangaRoutes);
router.use('/db', dbRoutes);

module.exports = router;