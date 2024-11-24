const express = require("express");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { requireAdmin, requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to create a new category
router.post("/", requireAuth, requireAdmin, createCategory);

// Route to get all categories
router.get("/", getCategories);

// Route to get a category by ID
router.get("/:id", getCategoryById);

// Route to update a category by ID
router.put("/:id", requireAuth, requireAdmin, updateCategory);

// Route to delete a category by ID
router.delete("/:id", requireAuth, requireAdmin, deleteCategory);

module.exports = router;