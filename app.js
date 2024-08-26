const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const routes = require('./routes');
const apiRoutes = require('./api/routes')
const PORT = process.env.SERVER_PORT;;
const app = express();
const  queryCreateTable = require('./db/db');

app.use(express.json());
 queryCreateTable();



const middleware = require('./middleware/middleware');
middleware(app);


//app.use(express.static('public'))
app.use('/', routes);
app.use('/login',apiRoutes)



app.listen(PORT, () => {
  console.log(`port ${PORT}`);
});



