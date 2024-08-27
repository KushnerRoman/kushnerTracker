const db = require('../db/db');


async function addBillForm(who,what,date,description,amount){
    try{
      const query = 'INSERT INTO bills (who, what, date, description, amount) VALUES (?, ?, ?, ?, ?)';
      const parms = [who,what,date,description,amount]
      const result = await db.executeQuery(query,parms);
      console.log('result:', result);
      if (result) {
          console.log('Bill added found:', result);
          return result;
        } else {
          console.log('No bill added');
        }
      } catch (error) {
        console.error('Error executing query:', error);
      }
}
module.exports = addBillForm ;