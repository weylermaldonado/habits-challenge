const DatabaseConnection = require('../config/database');
const ErrorFactory = require('../support/errors/error.factory.js')
const { Logger } = require('../support');

const logger = Logger('Product repository')
/**
 * Insert new product into the database.
 * @param {Object} product Product DTO
 * @returns {Promise<Product>} Product 
 */
function insert(product) {
    return new Promise((resolve, reject) => {
        DatabaseConnection.run(`INSERT INTO inventory(
         id,
         name,
         type,
         quantity,
         price,
         location,
         created_at
     ) VALUES (?,?,?,?,?,?,?)`,
            [product.id,
            product.name,
            product.type,
            product.quantity,
            product.price,
            product.location,
            product.created_at],
            (err) => {
                if (err) {
                    logger.error(err.message);
                    return reject(ErrorFactory.queryError(err.message).toJSON());
                }
                logger.debug(`Successful inserted ${JSON.stringify(product)}`)
                return resolve(product);
            });
    });
};

module.exports = { insert };