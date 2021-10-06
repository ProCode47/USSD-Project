const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  pin: {
    type: Number,
    required:true
  }
  
});

module.exports = mongoose.model("User", UserSchema);
