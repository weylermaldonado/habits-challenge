const winston = require('winston');

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

/**
 * Logger factory function
 * @param {String} context Service context
 * @returns {Object} Logger functions
 */
function Logger(context) {
  this.context = context;
  return {
    debug: (message) => {
      logger.log({ level: 'info', message: `${new Date().toLocaleString()} [${this.context}] ${message}` });
    },
    error: (message) => {
      logger.log({ level: 'error', message: `${new Date().toLocaleString()} [${this.context}] ${message}` });
    },
  };
}

module.exports = Logger;
