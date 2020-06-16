const mongoose = require("mongoose");

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
});

userSchema.post("findOne", function (res, next) {
  if (!res) {
    next(new Error("Nothing found"));
  }
  next();
});

userSchema.post("deleteOne", function (res, next) {
  if (res.n == 0) {
    next(new Error("User doesn't exits"));
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
