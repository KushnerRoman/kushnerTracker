const mysql = require('mysql2/promise')


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
    try{
      await pool.execute(query);
      console.log('Table created successfully');
    }catch(err){
      console.error('Error creating table:', err);
    }
  
}


async function executeQuery(query, params) {
  try {
    console.log('Executing query:', query, 'with params:', params);
    const [rows,fields ]= await pool.execute(query, [params]);

    // Check if result is undefined or null
    if (!rows) {
      console.warn('Query returned undefined or null result');
      return null;
    }
    
    
    
    console.log('Query result:', rows);
    
    if (rows.length > 0) {
      return rows[0]; // Return the first row if there are results
    } else {
      return null; // Return null if no results
    }
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

  module.exports ={  queryCreateTable, executeQuery }