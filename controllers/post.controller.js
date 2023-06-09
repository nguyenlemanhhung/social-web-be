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

  async getAllPosts(req, res) {
    try {
      const posts = await postModel
        .find()
        .populate("user")
        .populate({
          path: "comments",
          populate: { path: "user" },
        });
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getAllPostsByCurrentUser(req, res) {
    try {
      const userId = req.user;
      // console.log("userId: " + userId);
      const posts = await postModel
        .find({ user: userId })
        .populate("user")
        .populate("comments");
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async editPostByCurrentUser(req, res) {
    try {
      const userId = req.user;
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new PostController();
