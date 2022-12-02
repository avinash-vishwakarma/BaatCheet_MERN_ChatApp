const jwt = require("jsonwebtoken");
const User = require("../Models/User.model");

exports.isAuth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const jwtToken = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    const foundUser = await User.findById(decoded._id);
    if (!foundUser) {
      return next({
        status: 403,
        message: "sorry no user found with token",
        payload: {
          authorization: true,
        },
      });
    }

    req.user = foundUser;
    next();
  } else {
    return next({
      status: 403,
      message: "sorry you are not authorized",
      payload: {
        authorization: true,
      },
    });
  }
};
