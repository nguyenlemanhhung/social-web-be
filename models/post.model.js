const mongoose = require("mongoose");

const Post = mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },
    image: {
      type: String,
    },
    video: {
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
