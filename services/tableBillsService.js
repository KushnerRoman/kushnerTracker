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

module.exports =  fillTable ;