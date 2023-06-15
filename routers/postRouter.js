const postRouter = require("express").Router();
const PostController = require("../controllers/post.controller");
const authentication = require("../middlewares/authentication");

postRouter.post("/create", authentication, PostController.createPost);

//get tat ca bai viet
postRouter.get("/", PostController.getAllPosts);

//get tat ca post theo current  user
postRouter.get(
  "/my-post",
  authentication,
  PostController.getAllPostsByCurrentUser
);

postRouter.put("/edit", authentication, PostController.editPostByCurrentUser);
module.exports = postRouter;
