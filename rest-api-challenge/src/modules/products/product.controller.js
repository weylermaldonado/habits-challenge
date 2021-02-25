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
    /**
        * Filter the products by name or id.
        * Or get all the product list.
        * @param {Object} filterCriteria Filter dto
        * @returns {Promise<Product | Product[]>} Product 
        */
    filterProducts(filterCriteria) {
        return new Promise((resolve, reject) => {
            this.__productService.filterProducts(filterCriteria)
                .then((product) => resolve(ResponseHelper.responseFrom(200, product)))
                .catch((err) => { console.log(err); return reject(err); });
        });
    };
}

module.exports = ProductController;