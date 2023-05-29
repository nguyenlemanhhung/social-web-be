const connectToDB = require("../connectDB");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const { uuid } = require("uuidv4");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

class UserController {
  async signIn(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Missing email or password !!!" });
      }

      const checkExist = await User.findOne({ username: username });

      if (!checkExist) {
        return res.status(404).json({ message: "User does not exist" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async signUp(req, res) {
    // const userID = uuid();
    // const username = req.body.username;
    // const email = req.body.email;
    // const password = req.body.password;

    // console.log({ userID, username });
    // req.body =
    // {
    //   username: username,
    // }
    console.log(req.body);
    try {
      const newUser = await User.create(req.body);
      return res.status(200).json(newUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new UserController();
