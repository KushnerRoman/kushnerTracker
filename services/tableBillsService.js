const db = require('../db/db');
const logger = require('./logger');

async function fillTable() {
  try{
  const result = await db.executeGetBillsQuery('SELECT * FROM bills ORDER BY date DESC',[] );
   ('Table filled:', result);
  if (result) {
     ('Table filled with', result.length, 'rows');
    return result;
  } else {
     ('No data bills found');
  }
} catch (error) {
   logger.info('Error executing query:', error);
}
}

async function fillTotalAmountTable() {
  try{
  const result = await db.executeGetBillsQuery('SELECT  who, SUM(amount) AS total_amount FROM bills GROUP BY who;',[] );
   ('Table filled:', result);
  if (result) {
    return result;
  } else {
     ('No data bills found');
  }
} catch (error) {
   logger.info('Error executing query:', error);
}
}

async function getCategoryNameAndUrl() {
  try{
  const result = await db.executeGetBillsQuery('SELECT  name, icon_url FROM category;',[] );
 
  if (result) {
    return result;
  } else {
     ('No data bills found');
  }
} catch (error) {
   logger.info('Error executing query:', error);
}
}

module.exports =  { fillTable, fillTotalAmountTable, getCategoryNameAndUrl } ;