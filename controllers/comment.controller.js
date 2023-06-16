const postModel = require("../models/post.model");
const commentModel = require("../models/comment.model");

class CommentController {
  async createComment(req, res) {
    try {
      let post_id = req.params.post_id;

      const comment = await commentModel.create({
        content: req.body.content,
        image: req.body.image,
        user: req.user,
        post: post_id,
      });
      const commentWithUser = await comment.populate("user");
      // await commentWithUser.save();
      const postByPostID = await postModel.findById(post_id);

      postByPostID.comments.push(commentWithUser);

      await postByPostID.save();

      return res.status(200).json(comment);
    } catch (error) {
      return res.status(500).json(error);
      console.log("create  comment error:", error);
    }
  }

  async getCommentsByPost(req, res) {
    try {
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = new CommentController();
