const mongoose = require("mongoose");

//Define the option schema
const optionSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    default: false, // Indicates if this option is the correct answer
  },
});

module.exports = optionSchema;
