const userRouter = require("express").Router();
const UserController = require("../controllers/user.controller");
const authentication = require("../middlewares/authentication");

userRouter.post("/sign-in", UserController.signIn);
userRouter.post("/sign-up", UserController.signUp);
userRouter.get("/current", authentication, UserController.getCurrentUser);
userRouter.get("/", UserController.getAllUsers);
userRouter.put("/edit-profile", authentication, UserController.editProfileUser);

module.exports = userRouter;
