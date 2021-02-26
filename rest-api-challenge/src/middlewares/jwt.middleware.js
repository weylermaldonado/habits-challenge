const ErrorFactory = require('../support/errors/error.factory.js');
const jwt = require('jsonwebtoken');

/**
 * Decode JWT tokens.
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Express function next
 * @returns {void}
 */
async function decodeJWT(req, res, next) {
    let token = req.get('Authorization');
    if (typeof token === 'undefined') {
        return res.status(401).json(ErrorFactory.unauthorizedError('Unauthorized').toJSONResponse());
    }
    token = token.replace('Bearer ', '');

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res
                .status(401)
                .json(ErrorFactory.unauthorizedError('Unauthorized').toJSONResponse());
        }
        req.auth = decoded.payload;
        return next();
    });
}


module.exports = { decodeJWT };