const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    name: {
      require: true,
      type: String,
    },
    number: {
      require: true,
      type: String,
      unique: true,
    },
    password: {
      require: true,
      type: String,
    },
    pic: {
      require: false,
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.methods.matchPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
