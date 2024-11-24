const express = require("express");
const {
  saveQuizResult,
  getResultbyUser,
  getQuizResultsByQuiz,
  getQuizLeaderboard,
  getAllQuizResults,
} = require("../controllers/quizResultcontroller");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

//Route to save quiz result
router.post("/", saveQuizResult);

//Route to get lall results for a quiz
router.get("/", requireAuth, requireAdmin, getAllQuizResults);

// Route to get quiz results by user
router.get("/user/:userId", getResultbyUser);

// Route to get quiz results by quiz
router.get("/quiz/:quizId", getQuizResultsByQuiz);

//Route to get leaderboard for a quiz
router.get("/leaderboard/:quizId", getQuizLeaderboard);

module.exports = router;