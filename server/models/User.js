const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"], // Only two roles: 'user' and 'admin'
    default: "user", // Default is 'user'
  },
 
}, { timestamps: true });

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
