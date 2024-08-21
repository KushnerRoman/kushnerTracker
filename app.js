const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const routes = require('./routes');
const PORT = 4000;

const app = express();
app.use(express.static('public'))

//const PORT = process.env.SERVER_PORT;



app.use('/', routes);

//app.use('/',(req,res)=>{
//    res.send("i groot")
//})

app.listen(PORT, () => {
  console.log(`port ${PORT}`);
});
