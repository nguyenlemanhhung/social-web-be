const postModel = require("../models/post.model");

class PostController {
  async createPost(req, res) {
    try {
      const result = await postModel.create({
        content: req.body.content,
        image: req.body.image,
        video: req.body.video,
        user: req.user,
      });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getAllPostsByCurrentUser(req, res) {
    try {
      const userId = req.user;
      // console.log("userId: " + userId);
      const posts = await postModel.find({ user: userId }).populate("user");
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new PostController();
