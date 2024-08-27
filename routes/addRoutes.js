const addBillForm = require('../services/addBillService');
const express = require ('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

router.post('/', async (req,res)=>{

    const { who, what, data, describe, amount } =req.body;
    console.log('Received form data:', { who, what, data, describe, amount });
    const addBillResult = await  addBillForm(who, what, data, describe, amount); 
    console.log(addBillResult)
    if(addBillResult){
        console.log(`add request received  ####    O.K    ####`);
             return res.json({success: true, redirectUrl: '/add'});
        }else{
          return  res.status(401).json({success : false , error : 'Invalid credentials'});
        }
})
module.exports =  router ;