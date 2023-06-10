const connectToDB = require("../connectDB");
const mongoose = require("mongoose");
const userModel = require("../models/user.model");
const postModel = require("../models/post.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class UserController {
  async signIn(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password không được để trống" });
    }
    const checkExist = await userModel.findOne({ email: email });

    if (!checkExist) {
      return res.status(401).json({ message: "Tài khoản không tồn tại !!!" });
    }

    const checkPassword = bcrypt.compareSync(password, checkExist.password);

    if (!checkPassword) {
      return res.status(401).json({ message: "Mật khẩu không chính xác" });
    }

    checkExist.password = "";

    const accessToken = jwt.sign(
      {
        userId: checkExist._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const post = await postModel
      .find({ user: checkExist._id })
      .populate("user");
    const postCount = post.length;
    console.log("post:", post);

    return res.status(200).json({
      user: checkExist,
      token: accessToken,
      metadata: { post_count: postCount, following_count: 100 },
    });
  }

  async signUp(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "username, email and password không được để trống" });
    }
    const checkExist = await userModel.findOne({ email: email });
    if (checkExist) {
      return res.status(400).json({ message: "Email đã được sử dụng" });
    }

    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND));

    const hash = bcrypt.hashSync(password);

    const result = await userModel.create({
      username: username,
      email: email,
      password: hash,
    });
    const accessToken = jwt.sign(
      {
        userId: checkExist._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      user: checkExist,
      token: accessToken,
      metadata: { post_count: 0, following_count: 0 },
    });
  }

  async getUser(req, res) {
    try {
      const userId = req.user;

      const user = await userModel.findById(userId);
      const post = await postModel.find({ user: userId }).populate("user");
      const postCount = post.length;

      if (!user) {
        return res.json({ message: "Không có user" });
      }
      return res.json({
        user: user,
        metadata: { post_count: postCount, following_count: 100 },
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async editProfileUser(req, res) {
    console.log("...", req.user, req.body);
    try {
      const userId = req.user;

      const result = await userModel.findByIdAndUpdate(
        { _id: userId },
        { $set: { username: "manhhungedit" } },
        { rawResult: true, new: true },
        function (err, docs) {
          if (err) {
            // err.type = "db err";
            // return callback(err);
            console.log("error getting: ", err);
          } else {
            console.log("success", docs);
          }
        }
        // (err, res) => {
        //   console.log(err, res);
        //   if (err) {
        //     console.log(err);
        //     // return res.status(400).json("Updated User : ");
        //   } else {
        //     console.log("Updated User : ", res);
        //     // return res.status(200).json("Updated User : ", docs);
        //   }
        // }
      );

      console.log("user: ", result);
      // return res.status(200).json("Updated User : ", user);
    } catch (error) {
      console.error("catch: ", error);
      return res.status(400).json(error);
    }
  }
}

module.exports = new UserController();
