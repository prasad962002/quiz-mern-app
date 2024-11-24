import React from "react";

const Question = ({ question, selectedAnswer, onAnswerChange }) => {
  return (
    <div className="text-center">
      <h3 className="text-2xl font-semibold mb-6">{question.title}</h3>
      <div className="flex flex-col items-center">
        {question.options.map((option) => (
          <label
            key={option._id}
            className="flex items-center mb-4 bg-gray-100 w-full max-w-lg p-4 rounded-lg shadow-sm"
          >
            <input
              type="radio"
              name={question._id}
              value={option._id}
              checked={selectedAnswer === option._id}
              onChange={() => onAnswerChange(question._id, option._id)}
              className="mr-3"
            />
            <span className="text-lg">{option.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Question;
