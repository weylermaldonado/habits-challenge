// aplicationerror.js
/**
 * Generic class error
 */
class ApplicationError extends Error {
  /**
   * Create a new ApplicationError.
   * @param {String} message Error message.
   * @param {String} status  Response status code.
   * @param {String} code Application-specific error code.
   * @param {String} nameSpecific Class-specific-name extended by.
   */
  constructor(message, status, code, nameSpecific) {
    super();
    this.errors = [];
    Error.captureStackTrace( this, this.constructor);
    this.name = nameSpecific || this.constructor.name;
    this.message = message || 'Something went wrong. Please try again.';
    this.status = status || 500;
    this.code = code || 0;
    this.obj = {
      name: this.name,
      message: this .message,
      status: this .status,
      code: this .code,
    };
    this.debug = !process.env.DEBUG_ERRORS ? true : (process.env.DEBUG_ERRORS === 'true');
    this.errors.push(this.obj);
    this.log();
    return this;
  }
  /**
    * Return a JSON error.
    * @returns {JSON} Error
    */
  toJSON() {
    return {
      status: this.obj.status,
      data: { error: this.obj },
    };
  }
  /**
    * Return a JSON error.
    * @returns {JSON} Error
    */
  toJSONResponse() {
    return { error: this.obj };
  }
  /**
    * Find the largest status value in the error's array.
    * @param {Array} array Error's arra
    * @returns {Number} Http Status code.
    */
  findLargestNumber(array) {
    const statusArray = array.map(
        ( o ) => { return o.status; });
    const riskerStatus = Math.max(...statusArray);
    return riskerStatus;
  }
  /**
   * Get the first element of the Error's array.
   * @returns {ApplicationError} Error object.
   */
  getFirstError() {
    return this .errors[0];
  }
  /**
    * Create and attach a new ApplicationError to an instanced error's array.
    *  @param {String} code Application-specific error code.
    * @param {String} status  Response status code.
    * @param {String} message Error message.
    * @return {Array} Error's arrays.
    */
  addError(code, status, message) {
    const nameSpecific = this.name;
    const newError = new ApplicationError(code, status, message, nameSpecific).getFirstError();
    this.errors.push(newError);
    return this.errors;
  }
  /**
   *
   */
  log() {
    const dateFormat = new Date(Date.now()).toUTCString();
    if (this.debug) {
      console.log({
        date: dateFormat,
        http_status: this.status,
        message: this.message,
        code: this.code,
        stack: this.stack,
      });
    }
  }
}
/**
    * Return a JSON error.
    * @returns {JSON} Error
    */
function toJSONInternal() {
  return {
    status: this.findLargestNumber(this.errors),
    data: { errors: this.errors },
  };
}
/**
 * Make the function toJSONInternal private.
 * @returns {Array} Returns the whole error's arrays
 */
ApplicationError.prototype.getErrorsArray = function() {
  const arr = toJSONInternal.call(this);
  return arr;
};

module.exports = ApplicationError;
