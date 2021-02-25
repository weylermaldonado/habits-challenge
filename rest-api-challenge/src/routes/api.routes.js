const router = require('express').Router();
const ProductResource = require('../modules/products/product.resource.js');

router.use('/products', ProductResource);

module.exports = router;
