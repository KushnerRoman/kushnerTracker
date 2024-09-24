const db = require('../db/db');
const logger = require('../logger');

async function findUser(email,password) {
  try{
  const result = await db.executeQuery('SELECT * FROM users WHERE email = ? and password = ?', [email,password]);
  if (result) {
     logger.info('User found:', result);
    return result;
  } else {
   logger.info('No user found');
  }
} catch (error) {
   logger.info('Error executing query:', error);
}
}

module.exports =  findUser ;