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
});

userSchema.post("findOne", function (res, next) {
  console.log(this);
  var url;
  for (k in this._fields) url = k;
  console.log(url);
  if (!res && url === "/users") {
    next();
  } else if (!res) {
    next(new CustomError("No User Found", 400));
  }
  next();
});

userSchema.post("deleteOne", function (res, next) {
  if (res.n == 0) {
    next(new CustomError("No user found", 400));
  }
  next();
});

userSchema.pre("findOne", function (next) {
  var obj;
  for (k in this._fields) obj = k;
  //console.log(obj);
  next();
});
module.exports = mongoose.model("User", userSchema);
