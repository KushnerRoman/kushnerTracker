const findUser = require('../services/userService');
const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pageController = require('../controllers/pageController');
const JWT_SECRET = process.env.JWT_SECRET;
router.get('/', pageController.getLoginPage);
const logger = require('./logger');

router.post('/', async (req,res)=>{

    const { email,password } = req.body;
     (`Login request received with password: ${password}`);
    const user = await  findUser(email,password); 
     (user)
    if(user){
         logger.info(`Login request received  ####    O.K    ####`);
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          JWT_SECRET,
          { expiresIn: '60d' }
      );

      // Set token in cookie
      res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
          maxAge: 60 * 24 * 60 * 60 * 1000 // 60 days in milliseconds
      });
       (`Login successful for user: ${email}`);
             return res.json({success: true, redirectUrl: '/add'});
        }else{
          logger.info()
          return  res.status(401).json({success : false , error : 'Invalid credentials'});
        }
})
module.exports =  router ;