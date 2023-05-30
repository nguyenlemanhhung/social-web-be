const userRouter = require("express").Router();
const UserController = require("../controllers/user.controller");
const authentication = require("../middlewares/authentication");

userRouter.post("/sign-in", UserController.signIn);
userRouter.post("/sign-up", UserController.signUp);
userRouter.get("/log-out", UserController.logOut);
userRouter.get("/", authentication, UserController.getUser);

module.exports = userRouter;
