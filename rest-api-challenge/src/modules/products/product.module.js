const { ProductRepository } = require('../../repository');
const ProductController = require('./product.controller.js');
const ProductService = require('./product.service.js');
const { nanoid } = require('nanoid');

const productService = new ProductService(ProductRepository, nanoid);

module.exports = {
    ProductController: new ProductController(productService),
};