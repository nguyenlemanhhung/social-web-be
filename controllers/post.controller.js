const postModel = require("../models/post.model");

class PostController {
  async createPost(req, res) {
    try {
      const result = await postModel.create({
        title: req.body.title,
        des: req.body.des,
        user: req.user,
      });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getPost(req, res) {
    try {
      const postId = req.params.id;
      const posts = await postModel.findById(postId).populate("user");
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new PostController();
