const ApplicationError = require('./application.error.js');
/**
 * Expired session error
 */
class FollowError extends ApplicationError {
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

module.exports = FollowError;
