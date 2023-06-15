const mongoose = require("mongoose");

const Comment = mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },
    image: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "posts",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("comments", Comment);
