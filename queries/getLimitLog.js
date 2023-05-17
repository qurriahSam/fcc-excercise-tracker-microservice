const User = require("../schema/user");

const getToLog = async (limit, objectId, res) => {
  try {
    const user = await User.findById(objectId).populate({
      path: "log",
      options: { limit: limit },
    });
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getToLog;
