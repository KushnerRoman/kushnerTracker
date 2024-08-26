const findUser = require('../services/userService');
const express = require ('express');
const router = express.Router();

router.post('/login', async (req,res)=>{

    const password = req.body;
    console.log(`Login request received with password: ${password}`);
    const user = await  findUser.findUser(password); 
    if(user){
        console.log(`Login request received  ####    O.K    ####`);
            return res.json({success : true});
        }
            return res.status(401).json({success : false , error : 'Invalid credentials'});


})
module.exports =  router ;