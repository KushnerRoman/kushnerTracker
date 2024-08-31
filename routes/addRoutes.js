const addBillForm = require('../services/addBillService');
const express = require ('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

router.get('/',pageController.getAddPage);

router.post('/addnewbill', async (req,res)=>{

    const { what, data, describe, amount, type } =req.body;
    console.log('req,user : ' , req.user)
    const who = req.user.userId;
    console.log('Received form data:', { who, what, data, describe, amount, type });
    const addBillResult = await  addBillForm(who, what, data, describe, amount, type); 
    console.log(addBillResult)
    if(addBillResult){
        console.log(`add request received  ####    O.K    ####`);
             return res.json({success: true});
        }else{
          return  res.status(401).json({success : false , error : 'Invalid credentials'});
        }
})
module.exports =  router ;