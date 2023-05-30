const connectToDB = require("../connectDB");
const mongoose = require("mongoose");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class UserController {
  async signIn(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "username, email and password không được để trống" });
    }
    const checkExist = await userModel.findOne({ username: username });

    if (!checkExist) {
      return res.status(401).json({ message: "username không tồn tại !!!" });
    }

    const checkPassword = bcrypt.compareSync(password, checkExist.password);

    if (!checkPassword) {
      return res.status(401).json({ message: "Mật khẩu không chính xác" });
    }

    checkExist.password = "";
    console.log("checkExist:", checkExist._id);

    const accessToken = jwt.sign({
      userId: checkExist._id,
    });

    console.log("accessToken:", accessToken);

    console.log("env:", process.env.JWT_SECRET);
    console.log("res: ", res.status);

    return res.status(200).json(
      {
        user: checkExist,
        token: accessToken,
      },
      process.env.JWT_SECRET
    );
  }

  async signUp(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "username, email and password cannot be left blank" });
    }
    const checkExist = await userModel.findOne({ username: username });
    if (checkExist) {
      return res.status(400).json({ message: "username already exists" });
    }

    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND));

    const hash = bcrypt.hashSync(password);

    const result = await User.create({
      username: username,
      email: email,
      password: hash,
    });
    return res.status(200).json({ message: "Đăng ký thành công !!!" });
  }

  async logOut(req, res) {
    req.session.user = null;
  }
}

module.exports = new UserController();
