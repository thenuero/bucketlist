const mongoose = require("mongoose");
const CustomError = require("../Utils/customError");

const listSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  todo: String,
  tag: String,
  owner: String,
});

listSchema.post("findOne", function (res, next) {
  if (!res) {
    next(new CustomError("Sorry.. Nothing found!", 404));
  }
  next();
});

listSchema.post("find", function (res, next) {
  if (res.length === 0) {
    next(new CustomError("No Items for this user!", 404));
  }
  next();
});

module.exports = mongoose.model("List", listSchema);
