const fs = require('fs');
const path = require('path');

const logDir = '/var/logs';
const logFile = path.join(logDir, 'access.log');

const logger = (req, res, next) => {
  const now = new Date();
  const date = now.toLocaleDateString('no-NO').replace(/\//g, '.');
  const log = `${date} - ${req.url}\n`;
  // Ensure log directory exists
  fs.mkdir(logDir, { recursive: true }, (err) => {
    if (!err) {
      fs.appendFile(logFile, log, (err) => {
        if (err) console.error('Log write error:', err);
      });
    }
  });
  next();
};

module.exports = logger;
