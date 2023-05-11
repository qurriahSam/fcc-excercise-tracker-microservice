require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const connectDB = require("./db/database");
const User = require("./schema/user");
connectDB();

morgan("tiny");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/users", async (req, res) => {
  const person = new User({
    username: req.body.username,
  });
  try {
    const result = await person.save();
    res.status(200).json({
      username: result.username,
      _id: result._id.toString(),
    });
    console.log(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/users", async (req, res) => {
  let filteredUsers = [];
  try {
    const users = await User.find({});
    users.forEach((user) => {
      filteredUsers.push({ username: user.username, _id: user._id.toString() });
    });
    return res.status(200).json(filteredUsers);
  } catch (error) {
    return res.status(500).json({});
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
