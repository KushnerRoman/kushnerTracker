const db = require('../db/db');


async function addBillForm(who,what,date,description,amount,type){
    try{
      const query = 'INSERT INTO bills (who, what, date, description, amount, type) VALUES (?, ?, ?, ?, ?, ?)';
      const parms = [who,what,date,description,amount, type]
      const result = await db.executeQuery(query,parms);
       ('result:', result);
      if (result) {
           ('Bill added found:', result);
          return result;
        } else {
           ('No bill added');
        }
      } catch (error) {
        console.error('Error executing query:', error);
      }
}
module.exports = addBillForm ;