const asyncHandler = require("express-async-handler");
const User = require("../Models/User.model");
exports.getAllUserController = asyncHandler(async (req, res, next) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { number: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword)
    .find({ _id: { $ne: req.user._id } })
    .select({ password: 0 });
  res.json({
    status: "ok",
    users,
  });
});
