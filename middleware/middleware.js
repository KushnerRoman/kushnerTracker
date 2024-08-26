const express = require('express');
const path = require('path');

module.exports = (app) => {
  const middlewareArray = [
    express.static(path.join(__dirname, 'public')),
    express.json(),
    express.urlencoded({ extended: true })
  ];

  // Custom middleware
  middlewareArray.push((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  return middlewareArray;
}