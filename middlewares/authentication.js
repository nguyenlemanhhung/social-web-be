const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    const tokenBearer = req.headers.authorization;
    const token = tokenBearer.split(" ")?.[1];

    if (!token) {
      return res.status(401).json({ message: "Không được xác thực" });
    }

    const checkToken = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("checkExistToken", checkToken);

    if (!checkToken) {
      return res.status(401).json({ message: "Không được xác thực" });
    }
    const userId = checkToken.userId;
    
    req.user = userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Không được xác thực" });
  }
};
module.exports = authentication;
