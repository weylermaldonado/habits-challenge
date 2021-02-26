const router = require('express').Router();
const ProductResource = require('../modules/products/product.resource.js');
const { JwtMiddleware } = require('../middlewares')
router.use('/products', JwtMiddleware.decodeJWT, ProductResource);

module.exports = router;
