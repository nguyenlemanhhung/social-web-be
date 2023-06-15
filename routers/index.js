const rootRouter = require("express").Router();
const userRouter = require("./userRouter");
const postRouter = require("./postRouter");
const commentRouter = require("./commentRouter");

rootRouter.use("/user", userRouter);
rootRouter.use("/post", postRouter);
rootRouter.use("/post", commentRouter);

module.exports = rootRouter;
