const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const verifyToken = async (req, res, next) => {
  const { token } = req.headers;
  const decoded = jwt.decode(token, process.env.SECRET_KEY);
  if (!decoded) {
    return res.send("wrong credentials");
  }
  req.user = decoded;
  next();
};

module.exports = { verifyToken };
