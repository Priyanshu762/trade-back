const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  balance: {
    type: Number,
    default: 0,
  },
});
const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
