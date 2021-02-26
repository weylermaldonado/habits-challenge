const { ProductRepository } = require('../../repository');
const ProductController = require('./product.controller.js');
const ProductService = require('./product.service.js');
const { nanoid } = require('nanoid');
const ProductEvents = require('./events/product.events.js');

const productService = new ProductService(ProductRepository, nanoid, ProductEvents);

module.exports = {
    ProductController: new ProductController(productService),
};