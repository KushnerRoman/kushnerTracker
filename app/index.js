
const express = require('express')
const app = express()
const port = 4000

app.use('/',(req,res)=>{
    res.send("i groot")
})


app.listen(4000,()=>{
    console.log("listen to potrt 40000")
});