const mysql = require('mysql2')


const pool =mysql.createPool({
  user : process.env.MYSQL_USER, 
  host : process.env.MYSQL_HOST, 
  password : process.env.MYSQL_PASSWORD, 
  port : process.env.MYSQL_PORT,
  database : process.env.MYSQL_DB,
});


async function queryCreateTable() {
  
    console.log("queryCreateTable ")
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        UNIQUE (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `;
    await pool.execute(query, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Table created successfully');
      }
    }
  );
  
}
  module.exports =  queryCreateTable