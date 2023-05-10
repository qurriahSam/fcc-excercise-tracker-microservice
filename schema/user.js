const { Schema, model } = require("mongoose");

const User = new Schema({
  username: String,
});

const UserModel = model("user", User);

module.exports = UserModel;
