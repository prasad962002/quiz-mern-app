const express = require("express");
const {
  createQuiz,
  getQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  getQuizzesByCategory,
  togglePublishQuiz,
} = require("../controllers/quizController");
const { requireAdmin, requireAuth } = require("../middleware/authMiddleware");
const router = express.Router();

//Route to create a new quiz
router.post("/", createQuiz);

//Route to get all quizzes
router.get("/", getQuizzes);

//Route to get single quiz by id
router.get("/:id", getQuizById);

//Route to get quizzes by category id
router.get("/category/:categoryId", getQuizzesByCategory);

//Route to update quiz by ID
router.put("/:id", updateQuiz);

//Route to delete quiz by ID
router.delete("/:id", deleteQuiz);

// Route to toggle publish status of a quiz by ID
router.put("/toggle-publish/:id", togglePublishQuiz);
module.exports = router;
