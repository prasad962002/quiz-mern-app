const mongoose = require("mongoose");

const quizResultSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //Reference to User Model
      required: true,
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz", //Reference to Quiz Model
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    correctAnswers: {
      type: Number,
      required: true,
    },
    attemptTime: {
      type: Number, //Time taken in seconds
      required: true,
    },
  },
  { timestamps: true }
);

const QuizResult = mongoose.model("QuizResult", quizResultSchema);
module.exports = QuizResult;