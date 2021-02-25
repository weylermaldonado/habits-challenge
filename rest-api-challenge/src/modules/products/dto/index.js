const Joi = require('joi');

const CreateProductDto = Joi.object({
    body: Joi.object().keys({
        name: Joi.string().required(),
        type: Joi.string().required(),
        quantity: Joi.number().required(),
        price: Joi.number().required(),
        location: Joi.string().required()
    })
});

const FilterProductsDto = Joi.object({
    query: Joi.object().keys({
        id: Joi.string(),
        name: Joi.string()
    })
});

const UpdateProductDto = Joi.object({
    params: Joi.object().keys({
        productId: Joi.string().required()
    }),
    body: Joi.object().keys({
        name: Joi.string(),
        type: Joi.string(),
        quantity: Joi.number(),
        price: Joi.number(),
        location: Joi.string()
    })
});

module.exports = { CreateProductDto, FilterProductsDto, UpdateProductDto };