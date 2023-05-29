const userRouter = require("express").Router();
const UserController = require("../controllers/user.controller");

userRouter.post("/sign-in", UserController.signIn);
userRouter.post("/sign-up", UserController.signUp);

module.exports = userRouter;
