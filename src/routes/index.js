const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const mangaRoutes = require('./mangaRoutes');

router.use('/user', userRoutes);
router.use('/manga', mangaRoutes);

module.exports = router;