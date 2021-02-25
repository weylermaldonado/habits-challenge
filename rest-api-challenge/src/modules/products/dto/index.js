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

module.exports = { CreateProductDto };