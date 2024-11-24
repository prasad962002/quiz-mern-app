const mongoose = require("mongoose");
const Category = require("./Category");
const questionSchema = require("./Question");

const quizSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference to category model
      required: true,
    },
    questions: [questionSchema],
    attemptLimit: {
      type: Number,
      required: true,
      default: 60, // Default time limit in seconds
    },
    isPublished: {
      type: Boolean,
      default: false, //Indicates if the quiz is published and available for users
    },
    quizCode: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
