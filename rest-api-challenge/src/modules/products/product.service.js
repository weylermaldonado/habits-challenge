const { ValidatorHelper } = require('../../support');

class ProductService {

    constructor(productRepository, uniqueId) {
        this.__productRepository = productRepository;
        this.__uniqueId = uniqueId;
    }
    /**
* Insert new product into the database.
* @param {Object} product Product DTO
* @returns {Promise<Product>} Product 
*/

    create(productDto) {
        return new Promise((resolve, reject) => {
            const product = this.__mappingDto(productDto);
            this.__productRepository.insert(product)
                .then((product) => resolve(product))
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
            if (ValidatorHelper.isEmpty(filterCriteria)) {
                this.__productRepository.getAll()
                    .then((product) => { return resolve(product); })
                    .catch((err) => { return reject(err); });
            }

            if (filterCriteria.name) {
                this.__productRepository.getProductByName(filterCriteria)
                    .then((product) => !product ? {} : product)
                    .then((product) => { return resolve(product); })
                    .catch((err) => { return reject(err); });
            }

            if (filterCriteria.id) {
                this.__productRepository.getProductById(filterCriteria)
                    .then((product) => !product ? {} : product)
                    .then((product) => { return resolve(product); })
                    .catch((err) => { return reject(err); });
            }
        });
    };
    /**
     * Attach the missing field fo the dto
     * to mapping to DB model
     * @param {Object} productDto Product dto
     * @returns {Object} Product model 
     */
    __mappingDto(productDto) {
        const currentDate = new Date();
        const productId = this.__uniqueId();

        return {
            ...productDto,
            created_at: currentDate,
            id: productId
        };
    }
}

module.exports = ProductService;