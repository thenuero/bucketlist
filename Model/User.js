const crypto = require("crypto");
const mongoose = require("mongoose");
const CustomError = require("../Utils/customError");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: String,
  email: {
    type: String,
    required: true,
  },
  age: Number,
  country: String,
  role: String,
  password: String,
  joined: Date,
  role: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

userSchema.post("findOne", function (res, next) {
  var url;
  for (k in this._fields) url = k;
  if (!res && url === "/users") {
    next();
  } else if (!res) {
    next(new CustomError("No User Found", 400));
  }
  next();
});

userSchema.post("deleteOne", function (res, next) {
  if (res.n == 0) {
    next(new CustomError("No user found", 404));
  }
  next();
});

userSchema.pre("findOne", function (next) {
  console.log(this.resetPasswordExpires > Date.now());
  next();
});

userSchema.methods.getResetToken = function () {
  //Generate the token
  const token = crypto.randomBytes(20).toString("hex");

  //Hash and store the token
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  //Set Expire time
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

  return token;
};

module.exports = mongoose.model("User", userSchema);
