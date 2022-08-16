const joi = require('joi')

const validator = (req, res, next) => {
    const schema = joi.object({
        fullname: joi.string()
        .min(5)
        .max(30)
        .pattern(new RegExp('[a-zA-Z]'))
        .required()
        .messages({
            'string.min': '"fullname": min 5 characters',
            'string.max': '"fullname": max 30 characters'
        }),
        photo: joi.string()
        .min(10)
        .trim()
        .required(),
        email: joi.string()
        .email({minDomainSegments:2})
        .required()
        .messages({
            'string.email' : '"email": incorrect format'
        }),
        password: joi.string()
        .min(8)
        .max(50)
        .pattern(new RegExp('[a-zA-Z0-9]'))
        .required()
        .messages({
            'string.min': '"password": min 8 characters',
            'string.max': '"password": max 50 characters'
        }),
        country: joi.string()
        .required(),
        from: joi.string()
        .required()
    })
    const validation = schema.validate(req.body.userData, {abortEarly:false})
    if (validation.error) {
        return res.json({
            success: false,
            from: 'validator',
            message: validation.error.details, test: validation
        })
    }
    next()
}

module.exports = validator