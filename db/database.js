require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;
const localUri = process.env.MONGO_LOCAL_URI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect(localUri, options);
    console.log("connected to mongoDB");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
