const Joi = require('@hapi/joi');

function registerValidation (req,res,next) {

  const schema = Joi.object({
    username : Joi.string().min(8).required(),
    firstname : Joi.string().required(),
    lastname : Joi.string(),
    country : Joi.string(),
    age : Joi.number().min(10).max(120),
    user : Joi.string(),
    email : Joi.string().required().email(),
    password : Joi.string().min(6).required(),
  })
  const {error} = schema.validate(req.body);
  if (error)
  return res.status(400).send(error.details[0].message);
  else
  next();
}

function loginValidation (req,res,next) {
  const schema = Joi.object ({
    email : Joi.string().required().email(),
    password : Joi.string().required().min(6)
  })
  const {error} =  schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  else {
    next();
  }
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
