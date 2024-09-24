const mysql = require('mysql2/promise')
const logger = require('./logger'); 

const pool =mysql.createPool({
  user : process.env.MYSQL_USER, 
  host : process.env.MYSQL_HOST, 
  password : process.env.MYSQL_PASSWORD, 
  port : process.env.MYSQL_PORT,
  database : process.env.MYSQL_DB,
});


async function queryCreateTableUser() {
  
    ("queryCreateTable ")
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
      logger.info('Table User created successfully');
    }catch(err){
      logger.info('Error creating table:', err);
    }
    pool.releaseConnection();
  
}
async function queryCreateTableBill() {
  
  ("queryCreateTableBill ")
  const query = `
    CREATE TABLE IF NOT EXISTS bills (
      id INT AUTO_INCREMENT PRIMARY KEY,
      who VARCHAR(255) NOT NULL,
      what VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      description VARCHAR(255) NOT NULL,
      amount INT NOT NULL,
      type VARCHAR(50) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  `;
  try{
    await pool.execute(query);
    ('Table Bill created successfully');
  }catch(err){
     logger.info('Error creating table:', err);
  }
  pool.releaseConnection();

}
async function queryCreateTableCategory() {
  
  ("queryCreateTableCategory ")
  const query = `
    CREATE TABLE IF NOT EXISTS category (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      icon_url VARCHAR(255) NOT NULL,
      description VARCHAR(100) 
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  `;
  try{
    await pool.execute(query);
    ('Table Category created successfully');
  }catch(err){
     logger.info('Error creating table:', err);
  }
  pool.releaseConnection();

}

async function executeQuery(query, params) {
  try {

    const [rows,fields ]= await pool.execute(query, params);

    

    // Check if result is undefined or null
    if (!rows) {
      console.warn('Query returned undefined or null result');
      return null;
    }
    if(rows.affectedRows>0){
      return rows.insertId;
    }

    if (rows.length > 0) {
      
      return rows[0]; // Return the first row if there are results
    } else {
      return null; // Return null if no results
    }
  } catch (error) {
     logger.info('Database query error:', error);
    throw error;
  }
}
async function executeGetBillsQuery(query, [params]) {
  try {
    ('Executing query:', query);
    const [rows,fields ]= await pool.execute(query, params);
    
    // Check if result is undefined or null
    if (!rows) {
    
      console.warn('Query returned undefined or null result');
      return null;
    }

    (rows)

    if (rows.length > 0) {
      
      return rows; // Return the rows
    } else {
      return null; // Return null if no results
    }
  } catch (error) {
     logger.info('Database query error:', error);
    throw error;
  }
}

async function getAllTotals(query,params){
try {
  const [rows,fields ]= await pool.execute(query, params);
          if (!rows) {
            console.warn('Query returned undefined or null result');
            return null;
          }

          if (rows.length > 0) {
            return rows; // Return the rows
          } else {
            return null; // Return null if no results
          }
        

  }  catch (error) {
     logger.info('Database query error:', error);
    throw error;
  }
  


}





  module.exports ={  queryCreateTable: queryCreateTableUser,
     executeQuery, queryCreateTableBill, executeGetBillsQuery, queryCreateTableCategory, getAllTotals }