const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.send("user with same credentials exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    return res.send({ username: user.username, token });
  } catch (err) {
    console.log(err.message);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    return res.send({ message: "user does not exist" });
  }
  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    return res.send({ message: "wrong password" });
  }
  const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY);
  const responseData = { username: existingUser.username, token };
  return res.send(responseData);
};

module.exports = { register, login };
