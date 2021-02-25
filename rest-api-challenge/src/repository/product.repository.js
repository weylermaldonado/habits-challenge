const DatabaseConnection = require('../config/database');
const ErrorFactory = require('../support/errors/error.factory.js')
const { Logger } = require('../support');
const db = require('../config/database');

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
/**
 * Filter products by name.
 * @param {String} product Product DTO
 * @returns {Promise<Product>} Product
 */
function getProductById(product) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM inventory WHERE id = ?`, [product.id], (err, product) => {
            if (err) {
                logger.error(err.message);
                return reject(ErrorFactory.queryError(err.message).toJSON());
            }
            logger.debug(`Successful get ${JSON.stringify(product)}`)
            return resolve(product);
        })
    });
};

/**
 * Filter products by name.
 * @param {String} product Product DTO
 * @returns {Promise<Product>} Product
 */
function getProductByName(product) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM inventory WHERE name = ?`, [product.name], (err, product) => {
            if (err) {
                logger.error(err.message);
                return reject(ErrorFactory.queryError(err.message).toJSON());
            }
            logger.debug(`Successful get ${JSON.stringify(product)}`)
            return resolve(product);
        })
    });
};

/**
 * Filter products by name.
 * @returns {Promise<Product>} Product[] 
 */
function getAll() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM inventory`, (err, rows) => {
            if (err) {
                logger.error(err.message);
                return reject(ErrorFactory.queryError(err.message).toJSON());
            }
            console.log(rows)
            logger.debug(`Successful get ${rows}`);
            return resolve(rows);
        })
    });
};
module.exports = { insert, getAll, getProductById, getProductByName };