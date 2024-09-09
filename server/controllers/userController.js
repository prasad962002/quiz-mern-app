const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator")

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw Error("All fields are required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw Error("Incorrect email");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error("Incorrect password");
    }
    const token = createToken(user._id);
    res
      .status(200)
      .json({ message: "User logged in successfully", user, token });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      throw Error("All fields are required");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw Error("User already exists");
    }

    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }
  
    if (!validator.isStrongPassword(password)) {
      throw Error("Password is not strong enough");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hash });
    const token = createToken(user._id);
    res
      .status(201)
      .json({ message: "User signed up successfully", user, token });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = { loginUser, signupUser };
