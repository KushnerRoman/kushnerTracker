const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const JWT_SECRET = process.env.JWT_SECRET
const jwt = require('jsonwebtoken');

// Custom logging middleware
const loggingMiddleware = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} `);
  next();
};

// Middleware setup function
const setupMiddleware = (app) => {
  // Built-in middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Custom middleware
  app.use(loggingMiddleware);
 
};
const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token;
  console.log('token : ', req.cookies)
  
  if (!token) {
    res.redirect('/login')
    //return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded)
    req.user = decoded;
    
    next();
  } catch (error) {
    
      console.log('redirect to /index')
      res.redirect('/login')
 
    //return res.status(401).json({ message: 'Invalid token' });
  }
};



module.exports = {
  setupMiddleware,
  loggingMiddleware,
  authMiddleware
};