const db = require('../db/db');


async function fillTable() {
  try{
  const result = await db.executeGetBillsQuery('SELECT * FROM bills' );
  console.log('Table filled:', result);
  if (result) {
    console.log('Table filled with', result.length, 'rows');
    return result;
  } else {
    console.log('No data bills found');
  }
} catch (error) {
  console.error('Error executing query:', error);
}
}

async function fillTotalAmountTable() {
  try{
  const result = await db.executeGetBillsQuery('SELECT  who, SUM(amount) AS total_amount FROM bills GROUP BY who;' );
  console.log('Table filled:', result);
  if (result) {
    return result;
  } else {
    console.log('No data bills found');
  }
} catch (error) {
  console.error('Error executing query:', error);
}
}

module.exports =  { fillTable, fillTotalAmountTable } ;