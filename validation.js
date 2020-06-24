const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

function registerValidation(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().min(8).required(),
    firstname: Joi.string().required(),
    lastname: Joi.string(),
    country: Joi.string(),
    age: Joi.number().min(10).max(120),
    user: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    role: Joi.string(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  else next();
}

function loginValidation(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    next();
  }
}

function tokenValidation(req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    res.status(400).send("Access Denied");
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified._id;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Invalid Token");
  }
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.tokenValidation = tokenValidation;
