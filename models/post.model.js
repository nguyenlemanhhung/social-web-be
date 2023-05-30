const mongoose = require("mongoose");

const Post = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    des: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("posts", Post);
