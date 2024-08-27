const fillTable = require('../services/tableBillsService');
const express = require ('express');
const router = express.Router();
const pageController = require('../controllers/pageController');


router.get('/', pageController.getTableBillsPage);

router.get('/fetchBills', async (req,res)=>{

    console.log('Table bills request received');
    const result = await  fillTable(); 
    console.log(result)
    if(result){
        console.log(`Table bills request received  ####    O.K    ####`);
             return res.json(result);
        }else{
          return  res.status(401).json({success : false , error : 'Invalid credentials'});
        }
})

router.get('/', pageController.getTableBillsPage);
module.exports =  router ;