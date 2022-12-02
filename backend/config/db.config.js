const mongoose = require("mongoose");

module.exports = (cb) => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Mongodb Connected");
      cb();
    })
    .catch((err) => {
      console.error("error from db", err);
    });
};
