const User = require("../schema/user");

const getFromLog = async (from, objectId, res) => {
  try {
    const user = await User.findById(objectId).populate({
      path: "log",
      match: { date: { $gte: from } },
    });
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getFromLog;
