const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

// Helper function to create a JWT token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Login user controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate inputs
    if (!email || !password) {
      throw new Error("All fields are required");
    }
    // Check if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("Incorrect email");
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Incorrect password");
    }

    // Create JWT token
    const token = createToken(user._id);

    // Respond with user data, excluding password
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup user controller
const signupUser = async (req, res) => {
  const { firstName, lastName, email, password, gender } = req.body;

  try {
    // Validate inputs
    if (!firstName || !lastName || !email || !password || !gender) {
      throw new Error("All fields are required");
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Validate email and password strength
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email");
    }
    if (!validator.isStrongPassword(password)) {
      throw new Error("Password is not strong enough");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
    });

    // Create JWT token
    const token = createToken(user._id);

    // Respond with user data, excluding password
    res.status(201).json({
      message: "User signed up successfully",
      user: {
        _id: user._id,
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { firstName, lastName, gender } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, gender },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginUser, signupUser, updateUser };
