

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