const express = require('express');

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

  // Custom middleware
  app.use(loggingMiddleware);
};

module.exports = {
  setupMiddleware,
  loggingMiddleware
};