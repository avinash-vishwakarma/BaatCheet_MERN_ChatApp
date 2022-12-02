const jwt = require("jsonwebtoken");

module.exports = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};
