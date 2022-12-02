const asyncHandler = require("express-async-handler");
const User = require("../Models/User.model");
const genrateToken = require("../util/genrateToken.util");

exports.loginUserController = asyncHandler(async (req, res, next) => {
  const { user_number, user_password } = req.body;
  if (!user_number || !user_password) {
    return next({
      status: 422,
      message: "enter valid input",
    });
  }

  // find the user and compare the passwor genrate token send token

  const user = await User.findOne({ number: user_number });
  if (!user) {
    return next({
      staus: 422,
      message: "sorry no user found with number",
    });
  }

  if (!(await user.matchPassword(user_password))) {
    return next({
      staus: 422,
      message: "wrong password",
    });
  }

  res.status(201).json({
    status: "ok",
    user: {
      name: user.name,
      number: user.number,
      _id: user._id,
    },
    token: genrateToken({
      name: user.name,
      _id: user._id,
    }),
  });
});

exports.registerUserController = asyncHandler(async (req, res, next) => {
  const { user_name, user_password, user_number, user_confirm_password } =
    req.body;

  if (
    !user_name ||
    !user_password ||
    !user_number ||
    !user_confirm_password ||
    user_password !== user_confirm_password
  ) {
    return next({
      staus: 422,
      message: "kindly enter valid details",
    });
  }

  const user = await User.findOne({ number: user_number });
  if (user) {
    return next({
      status: 422,
      message: "number already exists",
    });
  }

  // input validation end here

  const newUser = await User.create({
    name: user_name,
    number: user_number,
    password: user_password,
  });

  const findUser = await User.findById(newUser._id).select("-password");

  if (newUser) {
    res.status(201).json({
      status: "ok",
      user: findUser,
      token: genrateToken({
        name: user_name,
        _id: newUser.id,
      }),
    });
  } else {
    return next({
      message: "someting went wrong while addin user",
    });
  }
});
