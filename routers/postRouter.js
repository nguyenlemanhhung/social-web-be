const postRouter = require("express").Router();
const PostController = require("../controllers/post.controller");
const authentication = require("../middlewares/authentication");

postRouter.post("/create", authentication, PostController.createPost);
postRouter.get("/:id", authentication, PostController.getPost);

module.exports = postRouter;
