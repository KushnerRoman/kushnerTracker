const findUser = require('../services/userService');
const express = require ('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

router.get('/', pageController.getLoginPage);


router.post('/', async (req,res)=>{

    const { password } = req.body;
    console.log(`Login request received with password: ${password}`);
    const user = await  findUser(password); 
    console.log(user)
    if(user){
        console.log(`Login request received  ####    O.K    ####`);
        
             return res.json({success: true, redirectUrl: '/index'});

        }else{
          return  res.status(401).json({success : false , error : 'Invalid credentials'});
        }


})
module.exports =  router ;