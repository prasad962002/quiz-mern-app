import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import toast from "react-hot-toast";
import { useFetchCategories } from "../../hooks/useFetchCategories";
import Layout from "../../components/layout/Layout";

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState([]);
  const [attemptLimit, setAttemptLimit] = useState(60);
  const [isPublished, setIsPublished] = useState(false);
  const { categories } = useFetchCategories();

  // Handle adding a new question
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        title: "",
        options: [{ text: "", isCorrect: false }],
      },
    ]);
  };

  // Handle option changes for a question
  const handleOptionChange = (qIndex, oIndex, field, value) => {
    const updatedQuestions = [...questions];
    const option = updatedQuestions[qIndex].options[oIndex];

    if (field === "text") option.text = value;
    if (field === "isCorrect") option.isCorrect = !option.isCorrect;

    setQuestions(updatedQuestions);
  };

  // Add a new option to a question
  const handleAddOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push({ text: "", isCorrect: false });
    setQuestions(updatedQuestions);
  };

  // Handle question text change
  const handleQuestionChange = (qIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].title = value;
    setQuestions(updatedQuestions);
  };

  // function that validates whether every question has at least one correct option
  const validateQuestions = () => {
    for (const question of questions) {
      const hasCorrectOption = question.options.some(
        (option) => option.isCorrect
      );
      if (!hasCorrectOption) {
        return false;
      }
    }

    return true;
  };

  // Submit quiz data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || questions.length === 0) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!validateQuestions()) {
      toast.error("Each question must have at least one correct option.");
      return;
    }

    // Format questions to match the backend schema
    const formattedQuestions = questions.map((q) => ({
      title: q.title,
      options: q.options.map((o) => ({
        text: o.text,
        isCorrect: o.isCorrect,
      })),
    }));

    const quizData = {
      title,
      category,
      questions: formattedQuestions,
      attemptLimit,
      isPublished,
    };

    try {
      console.log(quizData);
      await axiosInstance.post("/quiz", quizData);

      toast.success("Quiz created successfully!");
      // Reset form
      setTitle("");
      setCategory("");
      setQuestions([]);
      setAttemptLimit(60);
      setIsPublished(false);
    } catch (error) {
      toast.error("Failed to create quiz.");
      console.log(error);
    }
  };

  return (
    <Layout role="admin">
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-4">Create New Quiz</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8"
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Quiz Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Attempt Limit (seconds)
            </label>
            <input
              type="number"
              value={attemptLimit}
              onChange={(e) => setAttemptLimit(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              min="1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Publish Quiz</label>
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />{" "}
            Publish
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Questions</h3>
            {questions.map((question, qIndex) => (
              <div key={qIndex} className="mb-4">
                <input
                  type="text"
                  placeholder="Question title"
                  value={question.title}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 w-full mb-2"
                  required
                />
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center mb-1">
                    <input
                      type="text"
                      placeholder={`Option ${oIndex + 1}`}
                      value={option.text}
                      onChange={(e) =>
                        handleOptionChange(
                          qIndex,
                          oIndex,
                          "text",
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded-lg p-2 flex-grow mr-2"
                      required
                    />
                    <input
                      type="checkbox"
                      checked={option.isCorrect}
                      onChange={() =>
                        handleOptionChange(qIndex, oIndex, "isCorrect")
                      }
                    />{" "}
                    Correct?
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddOption(qIndex)}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                >
                  Add Option
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddQuestion}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
            >
              Add Question
            </button>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 w-full mt-4"
          >
            Create Quiz
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateQuiz;
