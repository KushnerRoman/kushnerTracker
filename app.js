const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const routes = require('./index');
const loginApiRoutes = require('./routes/loginRoutes')
const tableApiRoutes =require ('./routes/tableBillsRoutes')
const addApiRoutes = require('./routes/addRoutes')
const cookieParser = require('cookie-parser');

const { setupMiddleware, authMiddleware } = require('./middleware/middleware');
const PORT = process.env.SERVER_PORT;
const app = express();
const  { queryCreateTable, queryCreateTableBill, queryCreateTableCategory } = require('./db/db');

queryCreateTable();
queryCreateTableBill();
queryCreateTableCategory();
setupMiddleware(app);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(express.static(path.join(__dirname, 'public')));
app.use('/handlers',express.static(path.join(__dirname, 'handlers')));
app.use(express.json());
app.use(cookieParser());



//app.use(express.static('public'))
app.use('/login',loginApiRoutes);
app.use('/add',authMiddleware,addApiRoutes)
app.use('/bills',authMiddleware,tableApiRoutes)
app.use('/' ,routes);



app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`port ${PORT}`);
});



