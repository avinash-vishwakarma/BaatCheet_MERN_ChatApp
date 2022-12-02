const User = require("../Models/User.model");

module.exports = async () => {
  const users = [
    {
      name: "yashwant vishwakarma",
      number: "9827489925",
      password: "testpassword",
    },
    {
      name: "ajay vishwakarma",
      number: "9827489926",
      password: "testpassword",
    },
    {
      name: "reena vishwakarma",
      number: "9827489927",
      password: "testpassword",
    },
    {
      name: "tillo vishwakarma",
      number: "9827489928",
      password: "testpassword",
    },
    {
      name: "raja vishwakarma",
      number: "9827489929",
      password: "testpassword",
    },
  ];

  try {
    const uploadedData = await User.insertMany(users);
    if (uploadedData) {
      return console.log("user data uploaded successfully");
    }
    console.log("someting went wrong while saving the data");
  } catch (err) {
    console.log(err);
  }
};
