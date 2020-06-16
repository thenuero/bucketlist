const mongoose = require("mongoose");

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

listSchema.pre("updateOne", function (next) {
  console.log("test");
  next();
});

listSchema.post("findOne", function (res, next) {
  if (!res) {
    console.log("its here");
    next(new Error("Sorry.. Nothing found!"));
  }
  next();
});

listSchema.post("find", function (res, next) {
  if (res.length === 0) {
    next(new Error("No Items for this user!"));
  }
  next();
});

module.exports = mongoose.model("List", listSchema);
