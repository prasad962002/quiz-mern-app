const Quiz = require("../models/Quiz");

// Function to generate a unique 6-digit quiz code
const generateQuizCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a random number between 100000 and 999999
};

//Create a new Quiz
const createQuiz = async (req, res) => {
  const { title, category, questions, attemptLimit, isPublished } = req.body;
  console.log("Title : ", questions);

  try {
    let uniqueCode;
    let existingCode;

    //Generate unique code
    do {
      uniqueCode = generateQuizCode();
      existingCode = await Quiz.findOne({ quizCode: uniqueCode });
    } while (existingCode);

    const newQuiz = new Quiz({
      title,
      category,
      questions,
      attemptLimit,
      isPublished,
      quizCode: uniqueCode,
    });

    await newQuiz.save();
    res.status(201).json({
      message: "Quiz created successfully",
      quiz: newQuiz,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get all quizzes
const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("category"); //Populate category details
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get a single quizby id
const getQuizById = async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await Quiz.findById(id).populate("category");
    if (!quiz) {
      return res.status(404).json({ error: "Quiz Not found" });
    }

    res.status(200).json(quiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get Quizzes by category
const getQuizzesByCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const quizzes = await Quiz.find({ category: categoryId }).populate(
      "category"
    );

    if (quizzes.length === 0) {
      return res
        .status(404)
        .json({ error: "No Quizzes found for this category" });
    }
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Update a quiz by Id
const updateQuiz = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedQuiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.status(200).json({
      message: "Quiz updated successfully",
      quiz: updatedQuiz,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete quiz by Id
const deleteQuiz = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(id);
    if (!deletedQuiz) {
      res.status(404).json({ error: "Quiz not found" });
    }

    res.status(200).json({
      message: "quiz deleted successfully",
      quiz: deletedQuiz,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Toggle publish status of a quiz
const togglePublishQuiz = async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    // Toggle the isPublished
    quiz.isPublished = !quiz.isPublished;
    const updatedQuiz = await quiz.save();

    res.status(200).json({
      message: `Quiz ${
        updatedQuiz.isPublished ? "published" : "unpublished"
      } successfully`,
      quiz: updatedQuiz,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createQuiz,
  getQuizzes,
  getQuizById,
  getQuizzesByCategory,
  updateQuiz,
  deleteQuiz,
  togglePublishQuiz,
};
