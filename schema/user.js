const { Schema, model } = require("mongoose");

const User = new Schema({
  username: String,
  count: { type: Number, default: 0 },
  exercises: [{ type: Schema.Types.ObjectId, ref: "exercise" }],
});

const UserModel = model("user", User);

module.exports = UserModel;
