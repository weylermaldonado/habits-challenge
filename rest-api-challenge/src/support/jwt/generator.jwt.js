const jwt = require('jsonwebtoken');
const Logger = require('../logger/config.js');
const logger = Logger('JWT HELPER');

function generateToken(payload) {
    return jwt.sign({ payload },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRES_AT });
}

logger.debug(`Use this JWT for development purpose: ${generateToken({})}`);

module.exports = { generateToken };

