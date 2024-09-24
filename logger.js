const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}]: ${message}`;
      })
    ),
    transports: [
      new winston.transports.File({ filename: 'app.log' }) // Logs go to app.log
    ]
  });


  module.exports = logger;