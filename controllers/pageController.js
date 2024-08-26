const path = require('path');

exports.getHomePage = (req, res) => {
  
  res.sendFile(path.join(__dirname, '../public/index.html'));
};

exports.getInfoPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../public/info.html'));
};

exports.getAddPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../public/add.html'));
};

exports.getLoginPage = (req,res)=>{
    res.sendFile(path.join(__dirname, '../public/login.html'));
};


