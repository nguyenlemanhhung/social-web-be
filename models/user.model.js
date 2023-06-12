const mongoose = require("mongoose");

const User = mongoose.Schema(
  {
    avatar: {
      type: String,
    },
    banner: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    phonenumber: {
      type: String,
    },
    signature: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("users", User);
