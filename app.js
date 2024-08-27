const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const routes = require('./routes');
const apiRoutes = require('./api/routes')
const { setupMiddleware, loginMiddleware } = require('./middleware/middleware');
const PORT = process.env.SERVER_PORT;
const app = express();
const  { queryCreateTable } = require('./db/db');

queryCreateTable();

setupMiddleware(app);



app.use(express.static(path.join(__dirname, 'public')));
app.use('/handlers',express.static(path.join(__dirname, 'handlers')));
app.use(express.json());



//app.use(express.static('public'))
app.use('/login',apiRoutes);
app.use('/', routes);



app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`port ${PORT}`);
});



