const mongoose = require("mongoose");

// Define the Category schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Ensure category names are unique
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Create the Category model
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
