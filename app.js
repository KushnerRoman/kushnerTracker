const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const routes = require('./index');
const loginApiRoutes = require('./routes/loginRoutes')
const tableApiRoutes =require ('./routes/tableBillsRoutes')
const addApiRoutes = require('./routes/addRoutes')

const { setupMiddleware, loginMiddleware } = require('./middleware/middleware');
const PORT = process.env.SERVER_PORT;
const app = express();
const  { queryCreateTable, queryCreateTableBill } = require('./db/db');

queryCreateTable();
queryCreateTableBill();
setupMiddleware(app);



app.use(express.static(path.join(__dirname, 'public')));
app.use('/handlers',express.static(path.join(__dirname, 'handlers')));
app.use(express.json());



//app.use(express.static('public'))
app.use('/login',loginApiRoutes);
app.use('/add',addApiRoutes)
app.use('/bills',tableApiRoutes)
app.use('/', routes);



app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`port ${PORT}`);
});



