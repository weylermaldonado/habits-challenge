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

module.exports = { CreateProductDto, FilterProductsDto };