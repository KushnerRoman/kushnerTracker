const addBillForm = require('../services/addBillService');
const express = require ('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const logger = require('../logger');
router.get('/',pageController.getAddPage);

router.post('/addnewbill', async (req,res)=>{
  try{
    const { what, data, describe, amount, type } =req.body;
    const who = req.user.email;
    const addBillResult = await  addBillForm(who, what, data, describe, amount, type); 
    if(addBillResult){
             return res.json({success: true});
        }else{
          return  res.status(401).json({success : false , error : 'Invalid credentials'});
        }
  }catch{
    return null;
  }
   
})




module.exports =  router ;