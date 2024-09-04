const path = require('path');

exports.getHomePage = (req, res) => {
  
  res.sendFile(path.join(__dirname, '../public/index.html'));
};

exports.getDashPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dashboard.html'));
};

exports.getInfoPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../public/info.html'));
};

exports.getAddPage = (req, res) => {
   ('add html')
  res.sendFile(path.join(__dirname, '../public/add.html'));
};

exports.getLoginPage = (req,res)=>{
  /* const token = req.cookies?.token;
  if (!token) {
    res.redirect('/index')
  }  */
  res.sendFile(path.join(__dirname, '../public/login.html'));
};
exports.getTableBillsPage = (req,res)=>{
  res.sendFile(path.join(__dirname, '../public/tableBills.html'));
};

