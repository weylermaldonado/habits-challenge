const ApplicationError = require('./application.error.js');
/**
 * Third part dependecy error
 */
class ThirdPartError extends ApplicationError {
  /**
   * Default error
   * @param {String} message Error message
   * @param {Number} status HTTP Status
   * @param {Number} code Application specific code
   */
  constructor(message, status, code) {
    super(message, status, code);
  }
}

module.exports = ThirdPartError;
