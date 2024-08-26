const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

router.get('/', pageController.getHomePage);
router.get('/info', pageController.getInfoPage);
router.get('/add', pageController.getAddPage);
router.get('/login', pageController.getInfoPage);

module.exports = router;
