const Category = require("../models/Category");

// Create a new category
const createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    // Validate inputs
    if (!name) {
      throw new Error("Category name is required");
    }

    // Check if the category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      throw new Error("Category already exists");
    }

    // Create new category
    const category = await Category.create({
      name,
      description,
    });

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      message: "Categories retrieved successfully",
      categories,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single category by ID
const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      throw new Error("Category not found");
    }

    res.status(200).json({
      message: "Category retrieved successfully",
      category,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a category by ID
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    // Validate inputs
    if (!name) {
      throw new Error("Category name is required");
    }

    // Check if the category exists
    const category = await Category.findById(id);
    if (!category) {
      throw new Error("Category not found");
    }

    // Update the category
    category.name = name;
    if (description !== undefined) {
      category.description = description;
    }

    await category.save();
    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      throw new Error("Category not found");
    }

    res.status(200).json({
      message: "Category deleted successfully",
      category,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
