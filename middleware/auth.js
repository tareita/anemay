const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const verifyToken = async (req, res, next) => {
  try {
    const { token } = req.headers;
    const decoded = jwt.decode(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.send("token invalid");
  }
};

module.exports = { verifyToken };
