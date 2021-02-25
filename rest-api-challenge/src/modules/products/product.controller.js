const { ResponseHelper } = require('../../support');

class ProductController {

    constructor(productService) {
        this.__productService = productService;
    }
    /**
 * Insert new product into the database.
 * @param {Object} product Product DTO
 * @returns {Promise<Product>} Product 
 */
    create(productDto) {
        return new Promise((resolve, reject) => {
            this.__productService.create(productDto)
                .then((product) => resolve(ResponseHelper.responseFrom(201, product)))
                .catch((err) => reject(err));
        });
    };
}

module.exports = ProductController;