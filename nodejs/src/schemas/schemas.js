const Joi = require('joi');

module.exports.user_schema = Joi.object().keys({
    login: Joi.string().min(3).max(200).lowercase().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(15).required(),
    password_confirmation: Joi.any().valid(Joi.ref('password')).required(),
    full_name: Joi.string().min(3).max(20).required(),
})

module.exports.password_schema = Joi.object().keys({
    password: Joi.string().min(3).max(15).required(),
    password_confirmation: Joi.any().valid(Joi.ref('password')).required(),
})

module.exports.admin_schema = Joi.object().keys({
    login: Joi.string().min(3).max(200).lowercase(),
    email: Joi.string(),
    password: Joi.string().min(3).max(15),
    password_confirmation: Joi.any().valid(Joi.ref('password')),
    full_name: Joi.string().min(3).max(20),
    role: Joi.string().regex(/user|admin/),
})