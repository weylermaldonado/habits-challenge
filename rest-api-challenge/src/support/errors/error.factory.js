/* eslint-disable no-prototype-builtins */
const errorCodes = require('./codes.v2.json');
const err = require('./index.js');
/**
 *
 */
class ErrorFactory {}

for (const key in errorCodes) {
  if (errorCodes.hasOwnProperty(key)) {
    const element = errorCodes[key];
    const methodKey = key.replace('error', 'Error');
    ErrorFactory[methodKey] = (message) => {
      const fixedKey = key.replace('error', '');
      return new err[fixedKey](message, element.status, element.code);
    };
  }
}

module.exports = ErrorFactory;
