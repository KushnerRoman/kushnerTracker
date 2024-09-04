const db = require('../db/db');


async function findUser(email,password) {
  try{
  const result = await db.executeQuery('SELECT * FROM users WHERE email = ? and password = ?', [email,password]);
  if (result) {
     ('User found:', result);
    return result;
  } else {
     ('No user found');
  }
} catch (error) {
  console.error('Error executing query:', error);
}
}

module.exports =  findUser ;