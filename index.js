require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./db/database");
const User = require("./schema/user");
connectDB();

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
    res.json({
      username: result.username,
      _id: result._id.toString(),
    });
    console.log(result);
  } catch (error) {
    res.json({ error: error.message });
    console.error(error);
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
