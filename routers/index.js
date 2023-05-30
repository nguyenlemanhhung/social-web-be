const rootRouter = require("express").Router();
const userRouter = require("./userRouter");
const postRouter = require("./postRouter");

rootRouter.use("/user", userRouter);
rootRouter.use("/post", postRouter);

module.exports = rootRouter;
