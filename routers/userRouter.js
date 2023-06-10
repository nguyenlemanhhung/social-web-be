const userRouter = require("express").Router();
const UserController = require("../controllers/user.controller");
const authentication = require("../middlewares/authentication");

userRouter.post("/sign-in", UserController.signIn);
userRouter.post("/sign-up", UserController.signUp);
userRouter.get("/current", authentication, UserController.getUser);
userRouter.put("/edit-profile", authentication, UserController.editProfileUser);

module.exports = userRouter;
