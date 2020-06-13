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

module.exports = mongoose.model("List", listSchema);
