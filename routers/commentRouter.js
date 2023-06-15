const commentRouter = require("express").Router();
const CommentController = require("../controllers/comment.controller");
const authentication = require("../middlewares/authentication");

commentRouter.get("/:post_id/comments", CommentController.getCommentsByPost);

commentRouter.post(
  "/:post_id/comments/create",
  authentication,
  CommentController.createComment
);

module.exports = commentRouter;
