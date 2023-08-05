require("dotenv").config();
const { User } = require("./db.js");
const jwt = require("jsonwebtoken");

const authCheck = async function (req, res, next) {
  const token = req.headers.authorization;
  const tokenDecoded = await jwt.verify(
    token.split(" ")[1],
    process.env.TOKEN_KEY
  );
  if (tokenDecoded) {
    const foundUser = await User.findOne({
      where: {
        email: tokenDecoded.email,
      },
    });
    if (foundUser) {
      req.userAuth = true;
      next();
    } else {
      res.send({
        success: false,
        message: "User Not Found ... Contact Admin, User may be deleted.",
      });
    }
  } else {
    req.userAuth = false;
    next();
  }
};

module.exports = {
  authCheck,
};
