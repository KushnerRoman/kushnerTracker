const findUser = require('../services/userService');
const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pageController = require('../controllers/pageController');
const JWT_SECRET = process.env.JWT_SECRET;
router.get('/', pageController.getLoginPage);


router.post('/', async (req,res)=>{

    const { email,password } = req.body;
    console.log(`Login request received with password: ${password}`);
    const user = await  findUser(email,password); 
    console.log(user)
    if(user){
        console.log(`Login request received  ####    O.K    ####`);
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
      console.log(`Login successful for user: ${email}`);
             return res.json({success: true, redirectUrl: '/add'});
        }else{
          return  res.status(401).json({success : false , error : 'Invalid credentials'});
        }
})
module.exports =  router ;