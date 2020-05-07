const Joi = require("joi");

const userJoiSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

exports.userSchema = userJoiSchema;
