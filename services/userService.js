const db = require('../db/db');


async function findUser(password) {
  try{
  const result = await db.executeQuery('SELECT * FROM users WHERE  password = ?', [password]);
  if (result) {
    console.log('User found:', result);
    return result;
  } else {
    console.log('No user found');
  }
} catch (error) {
  console.error('Error executing query:', error);
}
}

module.exports =  findUser ;