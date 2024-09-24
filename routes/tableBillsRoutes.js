const { fillTable, fillTotalAmountTable, getCategoryNameAndUrl} = require('../services/tableBillsService');
const express = require ('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const logger = require('../logger');

router.get('/', pageController.getTableBillsPage);


router.get('/fetchBills', async (req,res)=>{

     ('Table bills request received');
    const result = await  fillTable(); 
     ('result from fetch table data ',result)
    if(result){
         (`Table bills request received  ####    O.K    ####`);
             return res.json(result);
        }else{
          return  res.status(401).json({success : false , error : 'Invalid credentials'});
        }
})

router.get('/fetchTotalBills', async (req,res)=>{

     ('Table bills total request received');
    const result = await  fillTotalAmountTable(); 
     ('result from table amount routes',result)
    if(result){
         (`Table bills request received  ####    O.K    ####`);
             return res.json(result);
        }else{
          return  res.status(401).json({success : false , error : 'Invalid credentials'});
        }
})
router.get('/category/fetchCategory', async (req,res)=>{

   ('Table Category  request received');
  const result = await  getCategoryNameAndUrl(); 
 
  if(result){
       (`Table bills request received  ####    O.K    ####`);
           return res.json(result);
      }else{
        return  res.status(401).json({success : false , error : 'Invalid credentials'});
      }
})


router.get('/', pageController.getTableBillsPage);
module.exports =  router ;