const mongoose = require("mongoose");
const optionSchema = require("./Option");

// Define the Question schema
const questionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  options: [optionSchema], // Array of options for each question
});

module.exports = questionSchema;
