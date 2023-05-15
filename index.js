require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const connectDB = require("./db/database");
connectDB();

const User = require("./schema/user");
const Exercise = require("./schema/exercise");

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

app.post("/api/users/:_id/exercises", async (req, res) => {
  const objectId = new mongoose.Types.ObjectId(req.params._id);
  const exercise = {
    description: req.body.description,
    duration: req.body.duration,
  };

  if (req.body.date) {
    exercise.date = req.body.date;
  }

  const newExercise = new Exercise(exercise);
  try {
    const saveExercise = await newExercise.save();
    const saveIdInUser = await User.findByIdAndUpdate(
      objectId,
      {
        $push: { log: saveExercise._id },
        $inc: { count: 1 },
      },
      { new: true, useFindAndModify: false }
    );
    // const populate = await saveIdInUser.populate("log", "-__v");
    return res.status(200).json({
      _id: saveIdInUser._id,
      username: saveIdInUser.username,
      description: saveExercise.description,
      duration: parseInt(saveExercise.duration),
      date: saveExercise.date,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error({ error: error.message });
  }
});

app.get("/api/users/:_id/logs", async (req, res) => {
  const objectId = new mongoose.Types.ObjectId(req.params._id);
  try {
    const user = await User.findById(objectId).populate("log", "-__v");
    let formatDate = user.log.map((exercise) => {
      return {
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date.toDateString(),
      };
    });

    res.status(200).json({
      _id: user._id,
      username: user.username,
      count: user.count,
      logs: formatDate,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
