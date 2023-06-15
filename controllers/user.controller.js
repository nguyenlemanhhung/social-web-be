const connectToDB = require("../connectDB");
const mongoose = require("mongoose");
const userModel = require("../models/user.model");
const postModel = require("../models/post.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class UserController {
  async signIn(req, res) {
    try {
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

      return res.status(200).json({
        user: checkExist,
        token: accessToken,
        metadata: { post_count: postCount, following_count: 100 },
      });
    } catch (error) {
      return res.status(400).json(error);
    }
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

  async getCurrentUser(req, res) {
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

  async getAllUsers(req, res) {
    try {
      const users = await userModel.find();
      if (!users) {
        return res.json({ message: "Không có user" });
      }
      return res.json({
        users: users,
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
        userId,
        {
          $set: {
            avatar: req.body.avatar,
            banner: req.body.banner,
            username: req.body.username,
            phonenumber: req.body.phonenumber,
            signature: req.body.signature,
          },
        },
        { new: true }
      );

      if (!result) {
        return result.status(400).json("no document found");
      }
      return res.status(200).json(result);
    } catch (error) {
      console.error("catch: ", error);
      return res.status(400).json(error);
    }
  }
}

module.exports = new UserController();
