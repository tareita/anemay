const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { username, email, password, aboutMe } = req.body;
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return res.send({ message: "User with same username exists" });
  }
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.send({ message: "User with same email exists" });
  }
  if (!password || !username || !email) {
    return res.send({ message: "All fields must have input" });
  }

  if (password.length < 8) {
    return res.send({ message: "Password must be atleast 8 characters" });
  }

  console.log(password.minLength);
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    email,
    password: hashedPassword,
    aboutMe,
  });

  try {
    await user.save();
  } catch (err) {
    return res.send({ message: err.message });
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
  return res.send({ username: user.username, token, success: true });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username }).select("+password");
  if (!existingUser) {
    return res.send({ message: "Incorrect username or password." });
  }
  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    return res.send({ message: "Incorrect username or password." });
  }
  const token = jwt.sign(
    { id: existingUser._id, isAdmin: existingUser.isAdmin },
    process.env.SECRET_KEY
  );

  const responseData = {
    username: existingUser.username,
    isAdmin: existingUser.isAdmin,
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
