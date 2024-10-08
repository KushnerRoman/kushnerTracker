const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

router.get('/' , (req,res)=>{
    console.log('redirect to /index')
    res.redirect('/index')
})

router.get('/index', pageController.getHomePage);
router.get('/info', pageController.getInfoPage);
router.get('/add', pageController.getAddPage);
router.get('/login', pageController.getLoginPage);
router.get('/bills', pageController.getTableBillsPage);



module.exports = router;
