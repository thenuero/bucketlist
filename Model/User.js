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

module.exports = mongoose.model("User", userSchema);
