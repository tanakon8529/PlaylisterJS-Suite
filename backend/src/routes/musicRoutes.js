const express = require('express');
const { searchMusic, fetchMusic } = require('../controllers/musicController');

const router = express.Router();

// Define routes
router.get('/search', searchMusic);
router.get('/fetch', fetchMusic);

module.exports = router;
