const router = require('express').Router();
const { CreateProductDto } = require('./dto');
const { RequestValidator } = require('../../support');
const { ProductController } = require('./product.module.js');

router.post('/', (req, res) => {
    const requestData = RequestValidator.fullValidate(CreateProductDto, req);
    if (requestData.error) return res.status(422).json(requestData);

    const product = { ...requestData.bodyData() };

    ProductController
        .create(product)
        .then(({ status = 200, data = {} }) => res.status(status).json(data))
        .catch(({ status = 500, data = {} }) => res.status(status).json(data));



});

module.exports = router;