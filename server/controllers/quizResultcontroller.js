const QuizResult = require("../models/QuizResult");

//Save quiz result
const saveQuizResult = async (req, res) => {
  const { user, quiz, score, totalQuestions, correctAnswers, attemptTime } =
    req.body;
  try {
    const result = new QuizResult({
      user,
      quiz,
      score,
      totalQuestions,
      correctAnswers,
      attemptTime,
    });

    await result.save();

    res.status(201).json({
      meesage: "Quiz result saved successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get quiz results by user
const getResultbyUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const results = await QuizResult.find({ user: userId })
      .populate("quiz", "title quizCode")
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(201).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get quiz results by quiz
const getQuizResultsByQuiz = async (req, res) => {
  const { quizId } = req.params;
  try {
    const results = await QuizResult.find({ quiz: quizId })
      .populate("user", "name")
      .sort({ score: -1 }); //Sort by score in descending order

    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "No quiz results found for this quiz" });
    }

    res.status(201).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get leaderboard for a quiz
const getQuizLeaderboard = async (req, res) => {
  const { quizId } = req.params;
  const { limit = 10 } = req.query; // Default limit to 10 if not provided

  try {
    const leaderboard = await QuizResult.find({ quiz: quizId })
      .populate("user", "name") // Populate user name
      .sort({ score: -1 }) // Sort by score in descending order
      .limit(limit); // Limit to specified number of results

    if (leaderboard.length === 0) {
      return res
        .status(404)
        .json({ error: "No quiz results found for this quiz" });
    }

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllQuizResults = async (req, res) => {
  try {
    const results = await QuizResult.find()
      .populate("user", "name")
      .populate("quiz", "title quizCode")
      .sort({ _id: -1 });
    res.status(201).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  saveQuizResult,
  getResultbyUser,
  getQuizResultsByQuiz,
  getQuizLeaderboard,
  getAllQuizResults,
};
