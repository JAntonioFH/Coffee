const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3);
const password = Joi.string().min(8);
const image = Joi.string().uri();

const createUserSchema = Joi.object({
  name: name.required(),
  password: password.required(),
  image: image.required()
});

const updatePartialUserSchema = Joi.object({
  name:name,
  password:password,
  image: image
});
const getUserSchema = Joi.object({
  id: id.required(),
});

const updateUserSchema = Joi.object({
  name:name.required(),
  password:password.required(),
  image: image.required()
});

module.exports = {createUserSchema,updatePartialUserSchema,getUserSchema,updateUserSchema}
