const mongoose = require("mongoose");

const Post = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  des: {
    type: String,
  },
});
module.exports = mongoose.model("post", Post);
