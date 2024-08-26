const db = require('../db/db');


function findUser(email, password) {
  const [rows] = db.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
  return rows[0];
}

module.exports =  findUser ;