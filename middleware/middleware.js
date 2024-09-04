const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const JWT_SECRET = process.env.JWT_SECRET
const jwt = require('jsonwebtoken');

// Custom logging middleware
const loggingMiddleware = (req, res, next) => {
   (`${new Date().toISOString()} - ${req.method} ${req.url} `);
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
  
  
  if (!token) {
    res.redirect('/login')
    //return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
     console.log('from middleware  ',req.user)
    
    next();
  } catch (error) {
    
       ('redirect to /index')
      res.redirect('/login')
 
    //return res.status(401).json({ message: 'Invalid token' });
  }
};



module.exports = {
  setupMiddleware,
  loggingMiddleware,
  authMiddleware
};