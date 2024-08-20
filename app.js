const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT;

// app.use('/', routes);

app.use('/',(req,res)=>{
    res.send("i groot")
})

app.listen(PORT, () => {
  console.log(`port ${PORT}`);
});