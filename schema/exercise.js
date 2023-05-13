const { model, Schema } = require("mongoose");

const Exercise = new Schema({
  description: {
    type: String,
    required: true,
  },
  duration: Number,
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = model("exercise", Exercise);
