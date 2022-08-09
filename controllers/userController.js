const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { username, email, password, aboutMe } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.send("user with same credentials exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      aboutMe,
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
  const existingUser = await User.findOne({ username }).select("+password");
  if (!existingUser) {
    return res.send({ message: "user does not exist" });
  }
  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    return res.send({ message: "wrong password" });
  }
  const token = jwt.sign(
    { id: existingUser._id, isAdmin: existingUser.isAdmin },
    process.env.SECRET_KEY
  );
  const responseData = {
    username: existingUser.username,
    token,
    success: true,
  };
  return res.send(responseData);
};

const updateAboutMe = async (req, res) => {
  const { aboutMe } = req.body;
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) {
    return res.send({ message: "user not found" });
  }
  console.log(user.aboutMe);
  if (user._id != req.user.id) {
    return res.send({ message: "you're not allowed to do this" });
  }
  user.aboutMe = aboutMe;
  await user.save();

  return res.send({ user });
};

module.exports = { register, login, updateAboutMe };
