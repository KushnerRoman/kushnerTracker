const mysql = require('mysql2')

const pool = mysql.createPool({
    user : process.env.MYSQL_USER,
    host : process.env.MYSQL_PASSWORD,
    port : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_PASSWORD,
    password : process.env.MYSQL_PASSWORD,
    
    
})
