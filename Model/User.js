const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type : String,
    required : true,
  },
  email : {
    type : String,
    required: true,
  },
  age : Number,
  country : String,
  role : String
});

module.exports = mongoose.model('User',userSchema);
