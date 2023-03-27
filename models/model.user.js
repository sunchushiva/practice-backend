const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connection = mongoose.connect(process.env.MONGOURL);

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { connection, UserModel };
