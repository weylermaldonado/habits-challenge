const { ResponseHelper } = require('../../support');

class ProductController {

    constructor(productService) {
        this.__productService = productService;
    }
    /**
 * Insert new product into the database.
 * @param {Object} product Product DTO
 * @param {Object} socketServer Socket io instance
 * @returns {Promise<Product>} Product 
 */
    create(productDto, socketServer) {
        return new Promise((resolve, reject) => {
            this.__productService.create(productDto, socketServer)
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
                .catch((err) => reject(err));
        });
    };
    /**
    * Update a product given their id.
    * @param {Object} productDto Product DTO
    * @param {String} searchCriteria Product id
    * @returns {Promise<Product>} Product 
    */
    update(productDto, searchCriteria) {
        return new Promise((resolve, reject) => {
            this.__productService.update(productDto, searchCriteria)
                .then(() => resolve(ResponseHelper.responseFrom(200, { message: 'Updated successfully.' })))
                .catch((err) => reject(err));
        });
    };
    /**
     * Delete a product by id.
     * @param {Object} searchCriteria Delete product DTO
     * @param {Object} socketServer Socket io instance
     * @returns {Promise<Object>} Response  
     */
    delete(searchCriteria, socketServer) {
        return new Promise((resolve, reject) => {
            this.__productService.delete(searchCriteria, socketServer)
                .then(() => resolve(ResponseHelper.responseFrom(204, { message: 'Deleted successfully.' })))
                .catch((err) => reject(err));
        });
    };
}

module.exports = ProductController;