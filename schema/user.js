const { Schema, model } = require("mongoose");

const User = new Schema({
  username: String,
  count: Number,
  exercises: [{ type: Schema.Types.ObjectId, ref: "exercise" }],
});

const UserModel = model("user", User);

module.exports = UserModel;
