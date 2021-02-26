const router = require('express').Router();
const {
    CreateProductDto,
    FilterProductsDto,
    UpdateProductDto,
    DeleteProductDto
} = require('./dto');
const { RequestValidator } = require('../../support');
const { ProductController } = require('./product.module.js');

router.post('/', (req, res) => {
    const requestData = RequestValidator.fullValidate(CreateProductDto, req);
    if (requestData.error) return res.status(422).json(requestData);

    const product = { ...requestData.bodyData() };
    const socketServer = req.app.get('socketio');

    ProductController
        .create(product, socketServer)
        .then(({ status = 200, data = {} }) => res.status(status).json(data))
        .catch(({ status = 500, data = {} }) => res.status(status).json(data));
});


router.get('/', (req, res) => {
    const requestData = RequestValidator.fullValidate(FilterProductsDto, req);
    if (requestData.error) return res.status(422).json(requestData);

    const filterCriteria = { ...requestData.queryData() };

    ProductController
        .filterProducts(filterCriteria)
        .then(({ status = 200, data = {} }) => res.status(status).json(data))
        .catch(({ status = 500, data = {} }) => res.status(status).json(data));
});

router.patch('/:productId', (req, res) => {
    const requestData = RequestValidator.fullValidate(UpdateProductDto, req);
    if (requestData.error) return res.status(422).json(requestData);

    const fields = { ...requestData.bodyData() };
    const criteria = { ...requestData.paramsData() };

    ProductController
        .update(fields, criteria)
        .then(({ status = 200, data = {} }) => res.status(status).json(data))
        .catch(({ status = 500, data = {} }) => res.status(status).json(data));
});

router.delete('/:productId', (req, res) => {
    const requestData = RequestValidator.fullValidate(DeleteProductDto, req);
    if (requestData.error) return res.status(422).json(requestData);

    const criteria = { ...requestData.paramsData() };
    const socketServer = req.app.get('socketio');

    ProductController
        .delete(criteria, socketServer)
        .then(({ status = 200, data = {} }) => res.status(status).json(data))
        .catch(({ status = 500, data = {} }) => res.status(status).json(data));
});

module.exports = router;